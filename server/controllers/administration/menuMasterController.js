const { MenuMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Menu";

// Create Menu Master
exports.create = async (req, res) => {
  const requiredFields = {
    menu_name: "Menu Name",
    priority: "Menu Order",
    pid: "Parent Menu",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(MenuMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Menu Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(MenuMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Menu Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(MenuMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Menu Master
exports.update = async (req, res) => {
  const requiredFields = {
    menu_name: "Menu Name",
    priority: "Menu Order",
    pid: "Parent Menu",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(MenuMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Menu Master
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(MenuMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
