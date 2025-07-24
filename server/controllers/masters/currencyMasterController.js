const { CurrencyMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Currency Master";

// Create a new Currency Master
exports.create = async (req, res) => {
  const requiredFields = {
    currency_name: "Currency Name",
    currency_code: "Currency Code",
    currency_rate: "Currency Rate",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CurrencyMaster,
      fields: ["currency_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(CurrencyMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all active Currency Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(CurrencyMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Currency Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(CurrencyMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Currency Master by ID
exports.update = async (req, res) => {
  const requiredFields = {
    currency_name: "Currency Name",
    currency_code: "Currency Code",
    currency_rate: "Currency Rate",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CurrencyMaster,
      fields: ["currency_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(CurrencyMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft delete Currency Master by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(CurrencyMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
