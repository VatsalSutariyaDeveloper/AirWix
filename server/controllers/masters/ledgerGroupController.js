const { LedgerGroup } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Ledger Group";

/**
 * Create ledger group
 */
exports.create = async (req, res) => {
  const required = {
    group_name: "Group Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, required);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(LedgerGroup, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get all active ledger groups
 */
exports.getAll = async (req, res) => {
  try {
    const data = await commonQuery.findAllRecords(LedgerGroup, { status: 0 });
    return res.success("FETCH", MODULE, data);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get ledger group by ID
 */
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(LedgerGroup, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Update ledger group
 */
exports.update = async (req, res) => {
  const required = {
    group_name: "Group Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, required);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(LedgerGroup, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Soft delete ledger group
 */
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(LedgerGroup, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
