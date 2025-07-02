const { TemplateAccessPermission } = require("../../models/administrationModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Template Access Permission";

// Create Template Access Permission
exports.create = async (req, res) => {
  const requiredFields = {
    template_name: "Template Name",
    template_access_permission_ids: "Template Access Permission IDs",
    template_menu_show_permission_ids: "Template Menu Show Permission IDs",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(TemplateAccessPermission, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(TemplateAccessPermission, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(TemplateAccessPermission, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    template_name: "Template Name",
    template_access_permission_ids: "Template Access Permission IDs",
    template_menu_show_permission_ids: "Template Menu Show Permission IDs",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(TemplateAccessPermission, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(TemplateAccessPermission, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
