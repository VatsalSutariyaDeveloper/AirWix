const { SalesOrderAttachment } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Sales Order Attachment";

// Create Sales Order Attachment
exports.create = async (req, res) => {
  const requiredFields = {
    sales_order_id: "Sales Order",
    design_department: "Design Department",
    attachment_name: "Attachment Name",
    attachment_file: "Attachment File",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(SalesOrderAttachment, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Attachments
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(SalesOrderAttachment, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Attachment by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(SalesOrderAttachment, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Attachment
exports.update = async (req, res) => {
  const requiredFields = {
    sales_order_id: "Sales Order",
    design_department: "Design Department",
    attachment_name: "Attachment Name",
    attachment_file: "Attachment File",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(SalesOrderAttachment, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Attachment
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(SalesOrderAttachment, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
