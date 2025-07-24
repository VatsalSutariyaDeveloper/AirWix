const { ProcessTypeMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Process Type";

// Create Process Type Master
exports.create = async (req, res) => {
  const requiredFields = {
    process_type_name: "Process Type Name",
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProcessTypeMaster,
      fields: ["process_type_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ProcessTypeMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Process Type Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ProcessTypeMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Process Type Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ProcessTypeMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Process Type Master
exports.update = async (req, res) => {
  const requiredFields = {
    process_type_name: "Process Type Name",
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProcessTypeMaster,
      fields: ["process_type_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ProcessTypeMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Process Type Master
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ProcessTypeMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
