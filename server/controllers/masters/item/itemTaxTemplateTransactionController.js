const { ItemTaxTemplateTransaction } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Item Tax Template Transaction";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    tax_template_id: "Tax Template",
    tax_percentage: "Tax Percentage",
    tax_name: "Tax Name"
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const record = await commonQuery.createRecord(ItemTaxTemplateTransaction, req.body);
    return res.success("CREATE", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ItemTaxTemplateTransaction, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read One
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ItemTaxTemplateTransaction, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    tax_template_id: "Tax Template",
    tax_percentage: "Tax Percentage",
    tax_name: "Tax Name"
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ItemTaxTemplateTransaction, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ItemTaxTemplateTransaction, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
