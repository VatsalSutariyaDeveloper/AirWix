const {
  SalesOrder,
  SalesOrderTransaction,
  SalesOrderDeliveryDate,
  ItemMaster,
  DrawingMaster,
  ProductCategory,
  ProductUnitMaster,
  LedgerMaster,
  BranchMaster,
  StockTransaction,
  ReserveStock,
} = require("../../../models");
const sequelize = require("../../../config/database");
const commonQuery = require("../../../helpers/commonQuery");
const {
  createBillSundries,
  createTaxTransactions,
  updateSeries,
} = require("../../../helpers/functions/transaction_functions");
const validateRequest = require("../../../helpers/validateRequest");
const { Op, literal } = require("sequelize");
const {
  getCurrentStock,
  getReserveStock,
} = require("../../../helpers/functions/inventoryFunctions");
const { convertStock } = require("../../../helpers/functions/helperFunction");
const { fixDecimals } = require("../../../helpers/functions/commonFucntions");

const MODULE = "Sales Order Stock Allocate";

exports.getAll = async (req, res) => {
  try {
    const filters = {
      status: 0,
      production_status: 0,
      short_close_status: 0,
      invoice_status: 0,
    };

    const rows = await commonQuery.findAllRecords(
      SalesOrderTransaction,
      filters,
      false,
      {
        attributes: [
          "id",
          "product_id",
          "product_qty",
          "product_convert_qty",
          "product_base_unit",
          "product_convert_unit",
          "delivery_date",
          "allocate_qty",
        ],
        include: [
          {
            model: SalesOrder,
            as: "salesOrder",
            required: true,
            attributes: ["sales_order_no", "sales_order_date"],
            where: {
              order_acceptance_status: 1,
              approval_status: 3,
            },
            include: [
              {
                model: LedgerMaster,
                as: "ledger",
                attributes: ["ledger_name"],
                required: false,
              },
            ],
          },
          {
            model: ItemMaster,
            as: "product",
            required: true,
            attributes: ["item_name", "item_code"],
            include: [
              {
                model: DrawingMaster,
                as: "drawing",
                attributes: ["drawing_number"],
                required: false,
              },
              {
                model: ProductCategory,
                as: "category",
                attributes: ["category_name"],
                required: false,
              },
            ],
          },
          {
            model: ProductUnitMaster,
            as: "unit",
            attributes: ["unit_name"],
            required: false,
          },
          {
            model: ProductUnitMaster,
            as: "base_unit",
            attributes: ["unit_name"],
            required: false,
          },
          {
            model: ProductUnitMaster,
            as: "convert_unit",
            attributes: ["unit_name"],
            required: false,
          },
          {
            model: BranchMaster,
            as: "branch",
            attributes: ["branch_name"],
            required: false,
          },
        ],
        order: [["salesOrder", "delivery_date", "DESC"]],
      }
    );

    const appData = [];

    for (const row of rows) {
      const pendingqty =
        fixDecimals(row.product_qty) - fixDecimals(row.allocate_qty);

      const cstock = await getCurrentStock(
        row.product_id,
        row.product_base_unit,
        1
      );
      const rstock = await getReserveStock(
        row.product_id,
        row.product_base_unit,
        1
      );
      const availablestock = cstock - rstock;

      const cstock_conv = await getCurrentStock(
        row.product_id,
        row.product_convert_unit,
        2
      );
      const rstock_conv = await getReserveStock(
        row.product_id,
        row.product_convert_unit,
        2
      );

      const availablestock_conv = cstock_conv - rstock_conv;

      const validateqty = Math.min(pendingqty, availablestock);

      const drawing_number = row.product?.drawing?.drawing_number
        ? ` (${row.product.drawing.drawing_number})`
        : "";

      const item_code = row.product?.item_code
        ? ` (${row.product.item_code})`
        : "";

      const item_label = `${
        row.product?.item_name || ""
      }${item_code}${drawing_number}`;
      const category = row.product?.category?.category_name || "PRIMARY";

      const unitname = row.unit?.unit_name || "Unit";
      const cunit_name = row.convert_unit?.unit_name || "Conv Unit";

      const row_data = [];

      row_data.push(row.salesOrder?.sales_order_no || "N/A");
      row_data.push(row.salesOrder?.sales_order_date || "N/A");
      row_data.push(row.salesOrder?.ledger?.ledger_name || "N/A");
      row_data.push(item_label);
      row_data.push(category);

      let stock_allocate = "";
      let row_product_qty = fixDecimals(row.product_qty);
      let pendingqtyFixed = fixDecimals(pendingqty);
      let availablestockFixed = fixDecimals(availablestock);

      if (unitname === cunit_name) {
        row_data.push(`${row_product_qty} ${unitname}`);
        row_data.push(`${pendingqtyFixed} ${unitname}`);
        row_data.push(`${availablestockFixed} ${unitname}`);

        if (availablestock > 0) {
          stock_allocate = `<button type="button" class="btn btn-xs btn-success" title="Allocate Stock" onclick="open_stock_allocation_so(${row.id}, ${pendingqty}, '${unitname}')">Allocate Stock</button>`;
        }
      } else {
        const pendingqty_conv = await convertStock(
          pendingqty,
          row.product_id,
          2
        );
        const row_product_convert_qty = await convertStock(
          row.product_qty,
          row.product_id,
          2
        );
        const availablestock_conv = await convertStock(
          availablestock,
          row.product_id,
          2
        );

        row_data.push(
          `${fixDecimals(row.product_qty)} ${unitname}<br>${fixDecimals(
            row_product_convert_qty
          )} ${cunit_name}`
        );
        row_data.push(
          `${fixDecimals(pendingqty)} ${unitname}<br>${fixDecimals(
            pendingqty_conv
          )} ${cunit_name}`
        );
        row_data.push(
          `${fixDecimals(availablestock)} ${unitname}<br>${fixDecimals(
            availablestock_conv
          )} ${cunit_name}`
        );

        stock_allocate = 0;
        if (availablestock > 0 && pendingqty > 0) {
          stock_allocate = 1;
        }
      }

      row_data.push(
        new Date(row.delivery_date).toLocaleDateString("en-GB", {
          day: "2-digit",
          month: "short",
          year: "numeric",
        })
      );
      row_data.push(stock_allocate);

      appData.push(row_data);
    }

    return res.success("FETCH", MODULE, { aaData: appData });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.create = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const transaction = await sequelize.transaction();
  try {
    const { sales_order_transaction_id, product_id, reserved_stocks, branch_id, company_id, user_id } = req.body;

    for (const rowRstock of reserved_stocks) {
      let reserveBaseQty = fixDecimals(rowRstock.product_base_qty);

      const batchWhere = rowRstock.stock_id ? { id: rowRstock.stock_id } : {};

      const stockRecords = await commonQuery.findAllRecords(
        StockTransaction,
        {
          ...batchWhere,
          status: { [Op.ne]: 2 },
          stock_flag: 1,
          product_id: product_id,
          godown_id: rowRstock.godown_id,
          [Op.and]: [
            literal(
              "CAST(product_base_qty AS DECIMAL(15,5)) > CAST(used_base_qty AS DECIMAL(15,5))"
            ),
          ],
        },
        false,
        { raw: true },
        transaction
      );

      for (const rowDstock of stockRecords) {
        const pendingStock =
          rowDstock.product_convert_unit === rowRstock.product_base_unit
            ? fixDecimals(
                parseFloat(rowDstock.product_convert_qty) - parseFloat(rowDstock.used_convert_qty)
              )
            : fixDecimals(
                parseFloat(rowDstock.product_base_qty) - parseFloat(rowDstock.used_base_qty)
              );

        if (reserveBaseQty <= 0) break;

        let rqty = 0;
        if (pendingStock >= reserveBaseQty) {
          rqty = reserveBaseQty;
          reserveBaseQty = 0;
        } else {
          rqty = pendingStock;
          reserveBaseQty -= pendingStock;
        }

        const productData = await commonQuery.findOneById(
          ItemMaster,
          product_id,
          false,
          transaction,
          true
        );

        const isConv = productData.product_conv_unit === rowRstock.product_base_unit;

        const baseStock = await convertStock(rqty, product_id, isConv ? 1 : 2);
        const convStock = await convertStock(rqty, product_id, isConv ? 1 : 2);

        // 🔹 ADD RESERVE STOCK ENTRY HERE
        const reserveStockData = {
          product_id: product_id,
          godown_id: rowRstock.godown_id,
          product_base_unit: rowRstock.product_base_unit,
          product_base_qty: baseStock,
          product_convert_unit: rowRstock.product_convert_unit,
          product_convert_qty: convStock,
          stock_flage: 1,
          request_id: 0,
          ref_name: "Sales Order Allocation",
          ref_id: sales_order_transaction_id,
          stock_id: rowDstock.id,
          user_id,
          company_id,
          branch_id,
        };

        await commonQuery.createRecord(
          ReserveStock,
          reserveStockData,
          transaction
        );

        // 🔹 UPDATE STOCK TRANSACTION AFTER RESERVE ENTRY
        let used_base_qty, used_convert_qty;

        if (rowDstock.product_base_unit === productData.product_base_unit) {
          used_base_qty = fixDecimals(
            parseFloat(rowDstock.used_base_qty) + parseFloat(baseStock)
          );
          used_convert_qty = fixDecimals(
            parseFloat(rowDstock.used_convert_qty) + parseFloat(convStock)
          );
        } else {
          used_base_qty = fixDecimals(
            parseFloat(rowDstock.used_convert_qty) + parseFloat(convStock)
          );
          used_convert_qty = fixDecimals(
            parseFloat(rowDstock.used_base_qty) + parseFloat(baseStock)
          );
        }

        await commonQuery.updateRecordById(
          StockTransaction,
          { id: rowDstock.id },
          {
            used_base_qty,
            used_convert_qty,
          },
          transaction
        );

        // 🔹 UPDATE SALES ORDER TRANSACTION
        const salesOrderTrn = await commonQuery.findOneById(
          SalesOrderTransaction,
          sales_order_transaction_id,
          false,
          transaction,
          true
        );

        const so_qty = parseFloat(salesOrderTrn?.product_qty || 0);
        const done_qty = fixDecimals(
          parseFloat(salesOrderTrn?.allocate_qty || 0) +
            parseFloat(rowRstock?.product_base_qty || 0)
        );
        const done_conv_qty = fixDecimals(
          parseFloat(salesOrderTrn?.allocate_convert_qty || 0) +
            parseFloat(rowRstock?.product_convert_qty || 0)
        );

        const trnData = {
          allocate_qty: done_qty,
          allocate_convert_qty: done_conv_qty,
        };

        if (so_qty > 0 && done_qty >= so_qty) {
          trnData.bom_status = 1;
        }

        await commonQuery.updateRecordById(
          SalesOrderTransaction,
          { id: sales_order_transaction_id },
          trnData,
          transaction
        );
      }
    }

    await transaction.commit();
    return res.success("CREATE", "Sales Order", {});
  } catch (err) {
    await transaction.rollback();
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
