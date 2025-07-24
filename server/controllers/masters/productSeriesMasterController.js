const { ProductSeriesMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Product Series Master";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    product_type_id: "Product Type ID",
    product_code: "Product Code",
    product_series: "Product Series",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProductSeriesMaster,
      fields: ["product_code"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ProductSeriesMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ProductSeriesMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ProductSeriesMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    product_type_id: "Product Type ID",
    product_code: "Product Code",
    product_series: "Product Series",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProductSeriesMaster,
      fields: ["product_code"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ProductSeriesMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (Soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ProductSeriesMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
