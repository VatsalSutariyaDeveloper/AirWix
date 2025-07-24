const { InquiryAttachment } = require("../../../models");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Inquiry Attachment";

/**
 * Create Inquiry Attachment
 */
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_id: "Inquiry",
    attachment_name: "Attachment Name",
    attachment_file: "Attachment File",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(InquiryAttachment, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get All Inquiry Attachments
 */
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(InquiryAttachment, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get Inquiry Attachment by ID
 */
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(InquiryAttachment, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Update Inquiry Attachment
 */
exports.update = async (req, res) => {
  const requiredFields = {
    inquiry_id: "Inquiry",
    attachment_name: "Attachment Name",
    attachment_file: "Attachment File",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(InquiryAttachment, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Delete Inquiry Attachment (Soft Delete)
 */
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(InquiryAttachment, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
