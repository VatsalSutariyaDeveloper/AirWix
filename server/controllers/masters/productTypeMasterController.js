const { ProductTypeMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Product Type Master";

// Create a new Product Type Master
exports.create = async (req, res) => {
  const requiredFields = {
    product_type_name: "Product Type Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  // Validate with uniqueness check
  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProductTypeMaster,
      fields: ["product_type_name"],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ProductTypeMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all active Product Type Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ProductTypeMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Product Type Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ProductTypeMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Product Type Master by ID
exports.update = async (req, res) => {
  const requiredFields = {
    product_type_name: "Product Type Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  // Validate with uniqueness check excluding current ID
  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProductTypeMaster,
      fields: ["product_type_name"],
      excludeId: req.params.id,
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ProductTypeMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft delete Product Type Master by ID
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ProductTypeMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
