const { SalesOrderTransaction, ItemMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");

const MODULE = "Sales Order Branch Allocate";

// Get All Sales Orders with JOIN to SalesOrder
exports.getAll = async (req, res) => {
  try {
    const companyId = req.body.company_id; // Assuming company_id is available in req.user
    const companyConfiguration = req.companyConfiguration || {}; // Assuming config is attached to req

    // Build branch planning condition
    // Build branch planning condition
    const branchPlanningCondition = {};
    if (companyConfiguration.sales_wise_branch_planning_before_bom == 0) {
      branchPlanningCondition.bom_status = 1;
    } else {
      branchPlanningCondition.bom_status = 0;
    }

    // Build main where condition
    const whereCondition = {
      status: 0,
      production_status: 0,
      invoice_status: 0,
      short_close_status: 0,
      with_out_stock_invoice: 0,
      production_branch_id: 0,
      ...branchPlanningCondition,
    };

    // Sequelize query with associations using commonQuery.findAllRecords
    const results = await commonQuery.findAllRecords(
      SalesOrderTransaction,
      whereCondition,
      false,
      {
        include: [
          {
            association: "salesOrder",
            where: {
              order_acceptance_status: 1,
              approval_status: 3,
              company_id: companyId,
            },
            attributes: ["sales_order_no", "delivery_date", "jobwork_type"],
            include: [
              {
                association: "ledger",
                attributes: ["ledger_name"],
              },
            ],
          },
          {
            association: "product",
            attributes: [
              "item_code",
              "item_name",
            ],
            include: [
              {
                association: "category",
                attributes: ["category_name"],
              },
              {
                association: "drawing",
                attributes: ["drawing_number"],
              },
            ],
          },
          {
            association: "branch",
            attributes: ["branch_name"],
          },
          {
            association: "productionTrn",
            required: false,
            attributes: [
              [sequelize.fn("SUM", sequelize.col("productionTrn.product_qty")), "stock_add"],
              "sales_order_transaction_id",
            ],
            where: { status: 0 },
          },
        ],
        order: [["id", "DESC"]],
      }
    );

    // Format response
    const appData = [];
    results.forEach((row) => {
      const rowData = [];
      rowData.push(row.sales_order_no);
      rowData.push(
        row.sales_order_date
          ? new Date(row.sales_order_date).toLocaleDateString("en-GB")
          : ""
      );
      if (companyConfiguration.customer_show_in_production == "1") {
        rowData.push(row.l_name);
      }
      let drawingNumber = "";
      let itemCode = "";
      // You may want to get pro_search from req.query or req.body
      const pro_search = req.body.pro_search || [];
      if (pro_search.includes("drawing")) {
        drawingNumber = ` -- (${row.drawing_number})`;
      }
      if (pro_search.includes("item")) {
        itemCode = ` -- (${row.product_icode})`;
      }
      rowData.push(`${row.product_name} ${itemCode} ${drawingNumber}`);
      rowData.push(row.cat_name || "PRIMARY");
      rowData.push(row.product_qty);
      rowData.push(
        row.delivery_date
          ? new Date(row.delivery_date).toLocaleDateString("en-GB", {
              day: "2-digit",
              month: "short",
              year: "numeric",
            })
          : ""
      );
      // Buttons (for frontend, you may want to adjust)
      let stockAllocate = "";
      let view = "";
      const bulkAccessArray = req.bulkAccessArray || [];
      if (
        bulkAccessArray.includes(process.env.MRP_GET_SALES_ORDER_SLUG_CREATE)
      ) {
        if (companyConfiguration.trading_stock == 0) {
          stockAllocate = `<button type="button" class="btn btn-xs btn-success" data-original-title="Allocate Stock" data-toggle="tooltip" data-placement="top" onClick="open_stock_allocation_so(${row.sales_ordertrn_id})">Allocate Branch</button>`;
        }
      }
      if (row.description) {
        view = `<button class="btn btn-xs btn-primary" data-original-title="Product Description" data-toggle="tooltip" data-placement="top" type="button" onclick="open_so_trn_modal(${row.sales_ordertrn_id})"><i class="fa fa-eye"></i></button>`;
      }
      rowData.push(`${stockAllocate} ${view}`);
      appData.push(rowData);
    });

    res.json({ aaData: appData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Assign Standard BOM to Sales Order Transaction
exports.assignBranch = async (req, res) => {
  const { production_branch_id, sales_order_trn_id } = req.body;

  if (!production_branch_id || !sales_order_trn_id) {
    return res.error("VALIDATION_ERROR", {
      errors: ["branch_id and ref_sales_order_trn_id are required"],
    });
  }

  try {
    const updateData = { production_branch_id };
    const updated = await commonQuery.updateRecordById(
      SalesOrderTransaction,
      sales_order_trn_id,
      updateData
    );

    if (updated) {
      return res.success("UPDATE", MODULE, { success: true });
    } else {
      return res.success("UPDATE", MODULE, { success: false });
    }
  } catch (error) {
    return res.error("SERVER_ERROR", { error: error.message });
  }
};
