const { Permission } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Permission";

// Create Permission
exports.create = async (req, res) => {
  const requiredFields = {
    user_type_id: "User Type",
    menu_id: "Menu",
    permission: "Permission",
    add_permission: "Add Permission",
    edit_permission: "Edit Permission",
    delete_permission: "Delete Permission",
    other_permission: "Other Permission",
    approve_permission: "Approve Permission",
    final_approve_permission: "Final Approve Permission",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(Permission, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Permissions
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Permission, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Permission by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Permission, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Permission
exports.update = async (req, res) => {
  const requiredFields = {
    user_type_id: "User Type",
    menu_id: "Menu",
    permission: "Permission",
    add_permission: "Add Permission",
    edit_permission: "Edit Permission",
    delete_permission: "Delete Permission",
    other_permission: "Other Permission",
    approve_permission: "Approve Permission",
    final_approve_permission: "Final Approve Permission",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(Permission, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete Permission
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(Permission, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
