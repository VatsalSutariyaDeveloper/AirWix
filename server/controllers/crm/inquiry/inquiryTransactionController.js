const { InquiryTransaction } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Inquiry Transaction";

/**
 * Create Inquiry Transaction
 */
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_id: "Inquiry",
    product_id: "Product",
    product_unit_id: "Product Unit",
    quantity: "Quantity",
    product_base_unit_id: "Base Unit",
    product_base_quantity: "Base Quantity",
    product_convert_unit_id: "Convert Unit",
    product_convert_quantity: "Convert Quantity",
    rate: "Rate",
    convert_rate: "Convert Rate",
    amount: "Amount",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(InquiryTransaction, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get All Inquiry Transactions
 */
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(InquiryTransaction, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get Inquiry Transaction by ID
 */
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(InquiryTransaction, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Update Inquiry Transaction
 */
exports.update = async (req, res) => {
  const requiredFields = {
    inquiry_id: "Inquiry",
    product_id: "Product",
    product_unit_id: "Product Unit",
    quantity: "Quantity",
    product_base_unit_id: "Base Unit",
    product_base_quantity: "Base Quantity",
    product_convert_unit_id: "Convert Unit",
    product_convert_quantity: "Convert Quantity",
    rate: "Rate",
    convert_rate: "Convert Rate",
    amount: "Amount",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(InquiryTransaction, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Delete Inquiry Transaction (Soft Delete)
 */
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(InquiryTransaction, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
