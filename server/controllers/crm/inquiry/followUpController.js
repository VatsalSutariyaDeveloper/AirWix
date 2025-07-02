const { followUp } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "FollowUp";

// Create FollowUp
exports.create = async (req, res) => {
  const requiredFields = {
    task_type_id: "Task Type",
    ref_type_id: "Reference Type",
    ref_id: "Reference ID",
    assign_to: "Assigned To",
    priority: "Priority",
    next_followup_date: "Next Followup Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(followUp, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All FollowUps
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(followUp, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get FollowUp By ID
exports.getById = async (req, res) => {
  try {
    const result = await commonQuery.findOneById(followUp, req.params.id);
    if (!result || result.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update FollowUp
exports.update = async (req, res) => {
  const requiredFields = {
    task_type_id: "Task Type",
    ref_type_id: "Reference Type",
    ref_id: "Reference ID",
    assign_to: "Assigned To",
    priority: "Priority",
    next_followup_date: "Next Followup Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.updateRecordById(followUp, req.params.id, req.body);
    if (!result || result.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete FollowUp
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(followUp, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
