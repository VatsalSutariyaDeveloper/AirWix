const { Quotation } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Quotation";

// Add Quotation
exports.create = async (req, res) => {
  const requiredFields = {
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    company_id: "Company",
    user_id: "User",
    branch_id: "Branch"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(Quotation, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Quotations
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Quotation, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Quotation by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Quotation, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Quotation
exports.update = async (req, res) => {
  const requiredFields = {
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    company_id: "Company",
    user_id: "User",
    branch_id: "Branch"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(Quotation, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete Quotation (Soft Delete)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(Quotation, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
