const { Op, fn, col } = require("sequelize");
const sequelize = require("../../config/database");
const {
  SalesOrderTransaction,
  SalesOrder,
  LedgerMaster,
  InvoiceTransaction,
  Invoice,
  ReserveStock,
  ItemMaster,
  ProductUnitMaster,
} = require("../../models");
const commonQuery = require("../../helpers/commonQuery");
const {
  fixDecimals,
  formatDateTime,
  generateSeriesNumber,
  updateSeriesNumber,
} = require("../../helpers/functions/commonFucntions");

exports.getPendingSalesOrderInvoice = async (req, res) => {
  try {
    const { date, company_id } = req.body;

    let start, end;

    if (date && date.includes(" - ")) {
      [start, end] = date.split(" - ").map((d) => new Date(d));
    } else {
      const today = new Date();
      start = new Date(today.setHours(0, 0, 0, 0));
      end = new Date(today.setHours(23, 59, 59, 999));
    }

    // Step 1: Get Sales Order Transactions using commonQuery
    const filters = {
      status: 0,
      invoice_status: 0,
    };

    const options = {
      include: [
        {
          model: SalesOrder,
          as: "salesOrder",
          where: {
            approval_status: 3,
            invoice_status: 0,
            company_id: { [Op.in]: [0, company_id] },
            status: 0,
            // sales_order_date: { [Op.between]: [start, end] },
          },
          include: [
            {
              model: LedgerMaster,
              as: "ledger",
              attributes: ["ledger_name"],
            },
          ],
        },
        {
          model: ItemMaster,
          as: "product",
          attributes: ["item_name"],
        },
        {
          model: ProductUnitMaster,
          as: "base_unit",
          attributes: ["unit_name"],
        },
        {
          model: ProductUnitMaster,
          as: "convert_unit",
          attributes: ["unit_name"],
        },
      ],
      order: [["id", "DESC"]],
    };

    const salesOrders = await commonQuery.findAllRecords(
      SalesOrderTransaction,
      filters,
      false,
      options
    );

    const data = await Promise.all(
      salesOrders.map(async (row, index) => {
        const so = row.salesOrder;
        const product = row.product;
        const baseUnit = row.base_unit;
        const convUnit = row.conv_unit;
        const ledger = so?.ledger;

        const invoiceQtyResult = await commonQuery.findAllRecords(
          InvoiceTransaction,
          {
            ref_module_id: row.id,
            ref_id: row.id,
            status: 0,
          },
          false,
          {
            attributes: [
              [fn("SUM", col("product_base_qty")), "invoice_qty"],
              [fn("SUM", col("product_convert_qty")), "invoice_conv_qty"],
            ],
            raw: true,
          }
        );

        const invoice_qty = fixDecimals(
          parseFloat(invoiceQtyResult?.invoice_qty || 0)
        );
        const invoice_conv_qty = fixDecimals(
          parseFloat(invoiceQtyResult?.invoice_conv_qty || 0)
        );

        let product_qty_display;
        if (row.unit_id === row.conv_unit_id) {
          product_qty_display = `${fixDecimals(row.product_qty)} ${
            baseUnit?.unit_name
          }`;
        } else {
          product_qty_display = `${fixDecimals(row.product_qty)} ${
            baseUnit?.unit_name
          }<br>${fixDecimals(row.product_convert_qty)} ${convUnit?.unit_name}`;
        }

        // === Reserve stock part 1 ===
        const reserveStockList = await commonQuery.findAllRecords(
          ReserveStock,
          {
            stock_flag: 1,
            status: { [Op.ne]: 2 },
            company_id: company_id,
            ref_name: "Sales Order Allocation",
            ref_id: row.id,
          },
          false,
          {
            attributes: [
              "id",
              "ref_id",
              [
                fn("IFNULL", fn("SUM", col("product_base_qty")), 0),
                "base_stock",
              ],
              [
                fn("IFNULL", fn("SUM", col("product_convert_qty")), 0),
                "convert_stock",
              ],
            ],
            raw: true,
            group: ["ref_id", "id"],
          }
        );

        const reserveIds = reserveStockList.map((r) => r.id);

        // === Reserve stock part 2 ===
        const usedStock = await commonQuery.findAllRecords(
          ReserveStock,
          {
            stock_flag: 2,
            status: { [Op.ne]: 2 },
            company_id: company_id,
            perent_id: { [Op.in]: reserveIds },
          },
          false,
          {
            attributes: [
              [
                fn("IFNULL", fn("SUM", col("product_base_qty")), 0),
                "used_base",
              ],
              [
                fn("IFNULL", fn("SUM", col("product_convert_qty")), 0),
                "used_conv",
              ],
            ],
            raw: true,
          }
        );

        const totalBaseStock = reserveStockList.reduce(
          (sum, item) => sum + parseFloat(item.base_stock || 0),
          0
        );
        const totalConvStock = reserveStockList.reduce(
          (sum, item) => sum + parseFloat(item.convert_stock || 0),
          0
        );

        const used_base = fixDecimals(parseFloat(usedStock?.used_base || 0));
        const used_conv = fixDecimals(parseFloat(usedStock?.used_conv || 0));

        const pqty = fixDecimals(totalBaseStock) - used_base;
        const pcqty = fixDecimals(totalConvStock) - used_conv;

        const invoice_pending =
          fixDecimals(row.product_qty) - fixDecimals(invoice_qty);
        const invoice_conv_pending =
          fixDecimals(row.product_convert_qty) - fixDecimals(invoice_conv_qty);

        let invoice_pending_display, pqty_display, reserve_stock;
        if (row.unit_id === row.conv_unit_id) {
          invoice_pending_display = `${fixDecimals(invoice_pending)} ${
            baseUnit?.unit_name
          }`;
          pqty_display = `${fixDecimals(pqty)} ${baseUnit?.unit_name}`;
          reserve_stock = fixDecimals(pqty - invoice_qty);
        } else {
          invoice_pending_display = `${invoice_pending} ${baseUnit?.unit_name}<br>${invoice_conv_pending} ${convUnit?.unit_name}`;
          pqty_display = `${fixDecimals(pqty)} ${
            baseUnit?.unit_name
          }<br>${pcqty} ${convUnit?.unit_name}`;
          reserve_stock = fixDecimals(pqty - invoice_conv_qty);
        }

        const so_to_inv_btn =
          row.with_out_stock_invoice === "0" && reserve_stock > 0 ? 1 : 1;

        return [
          index + 1,
          so.sales_order_no,
          formatDateTime(so.createdAt, "DD-MM-YYYY HH:mm:ss"),
          so.po_no,
          formatDateTime(so.po_date, "D M YYYY"),
          ledger?.ledger_name || "-",
          product?.item_name || "-",
          product_qty_display,
          invoice_pending_display,
          pqty_display,
          so_to_inv_btn,
        ];
      })
    );

    return res.json({ aaData: data });
  } catch (err) {
    console.error("Error in getPendingSalesOrderInvoice:", err);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.create = async (req, res) => {
  const transaction = await sequelize.transaction();
  try {
    const POST = req.body;
    const { invoice_transaction, salesorderid, sales_order } = POST;
    // const userSession = req.user;

    // Validate invoice transactions
    if (
      !Array.isArray(invoice_transaction) ||
      invoice_transaction.length === 0
    ) {
      throw new Error("Invoice transaction data is required.");
    }

    // Handle currency info
    const currencyInfo = POST.currency_enable
      ? {
          currency_id: POST.currency_id,
          currency_rate: POST.currency_rate,
        }
      : (() => {
          const base = { currencyid: 0 }; //await getBaseCurrency();
          return {
            currency_id: base.currencyid,
            currency_rate: 1,
          };
        })();

    // Prepare invoice data
    const parseDate = (val) => (val ? new Date(val) : null);
    const info = {
      invoice_no: await generateSeriesNumber(POST.series_type_id, POST.company_id, transaction),
      invoice_date: parseDate(POST.invoice_date),
      invoice_due_date: parseDate(POST.invoice_due_date),
      invoice_type: POST.invoice_type,
      challan_no: POST.challan_no,
      challan_date: parseDate(POST.challan_date),
      order_no: POST.order_no,
      order_date: parseDate(POST.order_date),
      enable_ewaybill: POST.enable_ewaybill === "yes" ? 1 : 0,
      eway_bill_no: POST.eway_bill_no,
      eway_bill_date: parseDate(POST.eway_bill_date),
      enable_transport: POST.enable_transport === "yes" ? 1 : 0,
      transpoter_id: POST.transpoter_id,
      customer_id: POST.customer_id,
      basic_total: POST.basic_total,
      grand_total: POST.grand_total,
      remark: POST.remark || "",
      user_id: POST.user_id,
      company_id: POST.company_id,
      branch_id: POST.branch_id,
      ref_id:
        Array.isArray(salesorderid) && salesorderid[0]
          ? salesorderid.join(",")
          : sales_order && sales_order !== "undefined"
          ? JSON.parse(sales_order).join(",")
          : null,
    };

    // Save invoice
    const newInvoice = await commonQuery.createRecord(
      Invoice,
      { ...info, ...(await currencyInfo) },
      transaction
    );

    if (!newInvoice?.id) throw new Error("Invoice creation failed.");
    await updateSeriesNumber(POST.series_type_id, POST.company_id, transaction);

    // Insert all invoice transaction records
    for (const item of invoice_transaction) {
      // Validate product_total_amount for each item
      if (parseFloat(item.product_total_amount) <= 0) {
        throw new Error(
          `Product total amount must be greater than 0 for product ID: ${item.product_id}`
        );
      }
      const trn = {
        invoice_id: newInvoice.id,
        product_id: item.product_id,
        product_description: item.product_description,
        product_specification: item.product_specification,
        prodct_unit: item.prodct_unit,
        product_qty: fixDecimals(item.product_qty),
        prodct_base_unit: item.prodct_base_unit,
        product_base_qty: fixDecimals(item.product_base_qty),
        prodct_convert_unit: item.prodct_convert_unit,
        product_convert_qty: fixDecimals(item.product_convert_qty),
        product_discount: fixDecimals(item.product_discount, 2),
        discount_per: fixDecimals(item.discount_per, 2),
        product_amount: fixDecimals(item.product_amount, 2),
        product_conv_amount: fixDecimals(item.product_conv_amount, 2),
        product_total_amount: fixDecimals(item.product_total_amount, 2),
        product_conv_total_amount: fixDecimals(
          item.product_conv_total_amount,
          2
        ),
        ref_module_id: item.ref_module_id || null,
        ref_id: item.ref_id || null,
        user_id: item.user_id,
        company_id: item.company_id,
        branch_id: item.branch_id,
      };

      await commonQuery.createRecord(InvoiceTransaction, trn, transaction);
    }

    await transaction.commit();
    return res.status(201).json({ success: true, data: newInvoice });
  } catch (error) {
    await transaction.rollback();
    console.error("Create Invoice Error:", error);
    return res
      .status(500)
      .json({ success: false, error: "Internal Server Error" });
  }
};
