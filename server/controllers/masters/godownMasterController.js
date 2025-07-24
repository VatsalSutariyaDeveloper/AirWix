const { GodownMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Godown";

// Create Godown Master
exports.create = async (req, res) => {
  const requiredFields = {
    name: "Godown Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: GodownMaster,
      fields: ["name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(GodownMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Godown Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(GodownMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Godown Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(GodownMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Godown Master
exports.update = async (req, res) => {
  const requiredFields = {
    name: "Godown Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: GodownMaster,
      fields: ["name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(GodownMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete Godown Master (Soft Delete)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(GodownMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
