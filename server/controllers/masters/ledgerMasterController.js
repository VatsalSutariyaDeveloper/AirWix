const { LedgerMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Ledger";

/**
 * Create a new ledger
 */
exports.create = async (req, res) => {
  const requiredFields = {
    ledger_name: "Ledger Name",
    ledger_code: "Ledger Code",
    ledger_group: "Ledger Group",
    opening_balance_type: "Opening Balance Type",
    balance_type: "Balance Type",
    ledger_type: "Ledger Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: LedgerMaster,
      fields: ["ledger_code"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(LedgerMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get all active ledgers
 */
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(LedgerMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get ledger by ID
 */
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(LedgerMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Update ledger by ID
 */
exports.update = async (req, res) => {
  const requiredFields = {
    ledger_name: "Ledger Name",
    ledger_code: "Ledger Code",
    ledger_group: "Ledger Group",
    opening_balance_type: "Opening Balance Type",
    balance_type: "Balance Type",
    ledger_type: "Ledger Type",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: LedgerMaster,
      fields: ["ledger_code"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(LedgerMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Soft delete ledger
 */
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(LedgerMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
