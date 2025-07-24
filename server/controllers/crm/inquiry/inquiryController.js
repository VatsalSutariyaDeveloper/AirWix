const { Inquiry } = require("../../../models");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Inquiry";

// Create Inquiry
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_no: "Inquiry No",
    inquiry_date: "Inquiry Date",
    inquiry_type_id: "Inquiry Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(Inquiry, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all Inquiries
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Inquiry, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Inquiry by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Inquiry, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Inquiry
exports.update = async (req, res) => {
  const requiredFields = {
    inquiry_no: "Inquiry No",
    inquiry_date: "Inquiry Date",
    inquiry_type_id: "Inquiry Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    excludeId: req.params.id
  });
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(Inquiry, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Inquiry
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(Inquiry, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
