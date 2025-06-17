const { BankMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Bank Name";

// Create a new bank master record
exports.create = async (req, res) => {
  const requiredFields = {
    bank_name: "Bank Name",
    branch_name: "Branch Name",
    account_number: "A/C Number",
    ifsc_code: "IFSC Code",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: BankMaster,
      fields: ["account_number"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(BankMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all active bank master records
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(BankMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get bank master record by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(BankMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update bank master record by ID
exports.update = async (req, res) => {
  const requiredFields = {
    bank_name: "Bank Name",
    branch_name: "Branch Name",
    account_number: "A/C Number",
    ifsc_code: "IFSC Code",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: BankMaster,
      fields: ["account_number"],
      excludeId: req.params.id,
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(BankMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft delete a bank master record by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(BankMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
