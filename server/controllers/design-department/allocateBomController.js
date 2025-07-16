const { SalesOrderTransaction, SalesOrder } = require("../../models/crmModels"); // Use models/index.js
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");

const MODULE = "Sales Order Transaction";

// Get All Sales Orders with JOIN to SalesOrder
exports.getAll = async (req, res) => {
  try {
    const query = `
      SELECT
        so.sales_order_no,
        so_trn.id,
        so.sales_order_date,
        so_trn.product_id,
        so_trn.product_qty,
        so_trn.product_description,
        so_trn.priority,
        so.id
      FROM sales_order_transaction AS so_trn
      LEFT JOIN sales_order AS so ON so.id = so_trn.sales_order_id
      WHERE
        so_trn.bom_status = 0
        AND so_trn.status = 0
        AND so_trn.short_close_status = 0
        AND so_trn.invoice_status = 0
        AND so.order_acceptance_status = 0
      GROUP BY so_trn.id
      ORDER BY so.sales_order_no DESC
    `;

    const [results] = await sequelize.query(query);

    // const result = await commonQuery.findAllRecords(SalesOrderTransaction, filters, false, options);
    return res.success("FETCH", MODULE, results);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
