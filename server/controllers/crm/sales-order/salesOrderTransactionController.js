const { SalesOrderTransaction } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Sales Order Transaction";

// Create Sales Order Transaction
exports.create = async (req, res) => {
  const requiredFields = {
    sales_order_id: "Sales Order",
    product_id: "Product",
    product_qty: "Product Quantity",
    product_unit: "Product Unit",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(SalesOrderTransaction, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (error) {
    return res.error("SERVER_ERROR", { error: error.message });
  }
};

// Get All Sales Order Transactions
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(SalesOrderTransaction, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (error) {
      console.log("❌ Error in getAll SalesOrderTransaction:", error); // Log full error

    return res.error("SERVER_ERROR", { error: error.message });
  }
};

// Get Sales Order Transaction by ID
exports.getById = async (req, res) => {
  try {
    const result = await commonQuery.findOneById(SalesOrderTransaction, req.params.id);
    if (!result || result.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, result);
  } catch (error) {
    return res.error("SERVER_ERROR", { error: error.message });
  }
};

// Update Sales Order Transaction
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {}, {});
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(SalesOrderTransaction, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (error) {
    return res.error("SERVER_ERROR", { error: error.message });
  }
};

// Soft Delete Sales Order Transaction
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(SalesOrderTransaction, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (error) {
    return res.error("SERVER_ERROR", { error: error.message });
  }
};
