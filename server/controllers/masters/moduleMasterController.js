const { ModuleMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Module";

exports.create = async (req, res) => {
  // Create a new Module Master record
  const requiredFields = {
    module_name: "Module Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ModuleMaster,
      fields: ["module_name"],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ModuleMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getAll = async (req, res) => {
  // Get all active Module Master records
  try {
    const result = await commonQuery.findAllRecords(ModuleMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getById = async (req, res) => {
  // Get one Module Master record by ID
  try {
    const record = await commonQuery.findOneById(ModuleMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.update = async (req, res) => {
  // Update Module Master record by ID
  const requiredFields = {
    module_name: "Module Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ModuleMaster,
      fields: ["module_name"],
      excludeId: req.params.id,
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ModuleMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  // Soft delete a Module Master record
  try {
    const deleted = await commonQuery.softDeleteById(ModuleMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
