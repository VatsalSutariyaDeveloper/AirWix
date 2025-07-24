const { StockTransaction } = require("../../models"); // Use models/index.js
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");

const MODULE = "Stock Transaction";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    product_id: "Product",
    product_base_qty: "Product QTY",
    stock_flage: "Stock Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  // Step 2: Now req.body is available
  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(StockTransaction, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read all
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(StockTransaction, {
      status: 0,
    });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(
      StockTransaction,
      req.params.id
    );
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    product_id: "Product",
    product_base_qty: "Product QTY",
    stock_flage: "Stock Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(
      StockTransaction,
      req.params.id,
      req.body
    );
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(
      StockTransaction,
      req.params.id
    );
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
