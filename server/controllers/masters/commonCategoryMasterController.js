const { CommonCategoryMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Common Category";

// Create a new Common Category
exports.create = async (req, res) => {
  const requiredFields = {
    category_name: "Category Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CommonCategoryMaster,
      fields: ["category_name"],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(CommonCategoryMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all active Common Categories
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(CommonCategoryMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Common Category by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(CommonCategoryMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Common Category by ID
exports.update = async (req, res) => {
  const requiredFields = {
    category_name: "Category Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CommonCategoryMaster,
      fields: ["category_name"],
      excludeId: req.params.id,
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(CommonCategoryMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft delete Common Category by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(CommonCategoryMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
