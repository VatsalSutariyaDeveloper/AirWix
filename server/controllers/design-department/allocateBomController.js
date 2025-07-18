const { SalesOrderTransaction, SalesOrder } = require("../../models/crmModels");
const {
  SalesOrderProductAssignBomVersion,
} = require("../../models/designDepartmentModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");

const MODULE = "Sales Order Transaction";
const ASSIGN_BOM_MODULE = "Assign Bom";

// Get All Sales Orders with JOIN to SalesOrder
exports.getAll = async (req, res) => {
  try {
    const result = await SalesOrderTransaction.findAll({
      where: {
        bom_status: 0,
        invoice_status: 0,
        short_close_status: 0,
        status: 0,
      },
      include: [
        {
          association: "salesOrder",
          where: { order_acceptance_status: "Accepted" },
          attributes: ["sales_order_no", "sales_order_date"],
        },
      ],
    });

    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Assign Standard BOM to Sales Order Transaction
exports.assignStandardBom = async (req, res) => {
  const { sales_order_transaction_id, product_id, bom_id, branch_id } =
    req.body;
  const { company_id, user_id } = req.body;

  const requiredFields = {
    user_id: "User",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  // Basic validation
  if (
    !Array.isArray(product_id) ||
    !Array.isArray(bom_id) ||
    !Array.isArray(sales_order_transaction_id) ||
    !Array.isArray(branch_id)
  ) {
    return res.error("VALIDATION_ERROR", {
      errors: [
        "product_id, bom_id, sales_order_transaction_id, and branch_id must be arrays",
      ],
    });
  }

  try {
    for (let i = 0; i < product_id.length; i++) {
      const currentBomId = bom_id[i];

      if (currentBomId) {
        const assignData = {
          sales_order_transaction_id: sales_order_transaction_id[i],
          product_id: product_id[i],
          bom_id: currentBomId,
          branch_id: branch_id[i],
          company_id,
          user_id,
        };

        // Insert into pro_so_asssign_bom_version
        const insertBom = await commonQuery.createRecord(
          SalesOrderProductAssignBomVersion,
          assignData
        );

        // If inserted successfully, update bom_status in sales_ordertrn
        if (insertBom) {
          await commonQuery.updateRecordById(
            SalesOrderTransaction,
            sales_order_transaction_id[i],
            {
              bom_status: 1,
              bom_id: currentBomId,
            }
          );
        }
      }
    }

    return res.success("CREATE", ASSIGN_BOM_MODULE, {});
  } catch (error) {
    console.error("BOM Assignment Error:", error);
    return res.error("SERVER_ERROR", { error: error.message });
  }
};

// Assign BOM to Sales Order Transaction
exports.assignBom = async (req, res) => {
  const {
    sales_order_transaction_id,
    product_id,
    bom_id,
    bom_version_id,
    branch_id,
    company_id,
    user_id,
  } = req.body;

  const requiredFields = {
    sales_order_transaction_id: "Sales Order Transaction",
    product_id: "Product",
    bom_id: "BOM",
    bom_version_id: "BOM Version",
    branch_id: "Branch",
    user_id: "User",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const currentBomId = bom_id;

    if (currentBomId) {
      const assignData = {
        sales_order_transaction_id: sales_order_transaction_id,
        product_id: product_id,
        bom_id: currentBomId,
        bom_version_id: bom_version_id,
        branch_id: branch_id,
        company_id,
        user_id,
      };

      // Insert into pro_so_asssign_bom_version
      const insertBom = await commonQuery.createRecord(
        SalesOrderProductAssignBomVersion,
        assignData
      );

      // If inserted successfully, update bom_status in sales_ordertrn
      if (insertBom) {
        await commonQuery.updateRecordById(
          SalesOrderTransaction,
          sales_order_transaction_id,
          {
            bom_status: 1,
            bom_id: currentBomId,
          }
        );
      }
    }

    return res.success("CREATE", ASSIGN_BOM_MODULE, {});
  } catch (error) {
    console.error("BOM Assignment Error:", error);
    return res.error("SERVER_ERROR", { error: error.message });
  }
};
