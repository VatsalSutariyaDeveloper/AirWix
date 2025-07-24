const { HSNMasterTransaction } = require("../../../models");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "HSN Master Transaction";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    hsn_id: "HSN ID",
    item_tax_template_id: "Item Tax Template ID",
    tax_rate: "Tax Rate",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(HSNMasterTransaction, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read all (status = 0 only)
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(HSNMasterTransaction, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read one
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(HSNMasterTransaction, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    hsn_id: "HSN ID",
    item_tax_template_id: "Item Tax Template ID",
    tax_rate: "Tax Rate",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(HSNMasterTransaction, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(HSNMasterTransaction, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
