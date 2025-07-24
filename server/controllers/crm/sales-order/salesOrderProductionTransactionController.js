const { SalesOrderProductionTransaction } = require("../../../models");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Sales Order Production Transaction";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    sales_order_transaction_id: "Sales Order Transaction",
    product_id: "Product",
    product_unit: "Product Unit",
    product_qty: "Product Quantity",
    request_id: "Request ID",
    gowdown_id: "Godown",
    stock_id: "Stock",
    allocate_qty: "Allocate Quantity",
    batch_no: "Batch Number",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(SalesOrderProductionTransaction, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(SalesOrderProductionTransaction, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(SalesOrderProductionTransaction, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    sales_order_transaction_id: "Sales Order Transaction",
    product_id: "Product",
    product_unit: "Product Unit",
    product_qty: "Product Quantity",
    request_id: "Request ID",
    gowdown_id: "Godown",
    stock_id: "Stock",
    allocate_qty: "Allocate Quantity",
    batch_no: "Batch Number",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(SalesOrderProductionTransaction, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(SalesOrderProductionTransaction, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
