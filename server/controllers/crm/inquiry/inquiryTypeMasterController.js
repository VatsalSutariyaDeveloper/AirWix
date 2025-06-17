const { InquiryTypeMaster } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Inquiry Type";

// Create Inquiry Type Master
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_type_name: "Inquiry Type Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: InquiryTypeMaster,
      fields: ["inquiry_type_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(InquiryTypeMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all Inquiry Type Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(InquiryTypeMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Inquiry Type Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(InquiryTypeMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Inquiry Type Master
exports.update = async (req, res) => {
  const requiredFields = {
    inquiry_type_name: "Inquiry Type Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: InquiryTypeMaster,
      fields: ["inquiry_type_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(InquiryTypeMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Inquiry Type Master
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(InquiryTypeMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
