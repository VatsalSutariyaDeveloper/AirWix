const { BranchMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Branch Name";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    branch_name: "Branch Name",
    country: "Country",
    state: "State",
    city: "City",
    pincode: "Pincode",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: BranchMaster,
      fields: ["branch_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(BranchMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(BranchMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(BranchMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    branch_name: "Branch Name",
    country: "Country",
    state: "State",
    city: "City",
    pincode: "Pincode",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: BranchMaster,
      fields: ["branch_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(BranchMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(BranchMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
