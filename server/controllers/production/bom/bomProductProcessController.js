const { BOMProductProcess } = require("../../../models/productionModels");
const { validateRequest, commonQuery } = require("../../../helpers/index");

const MODULE = "BOM Product Process";

// Add
exports.create = async (req, res) => {
  const requiredFields = {
    bom_version_id: "BOM Version ID",
    product_id: "Product ID",
    bom_id: "BOM ID",
    bom_product_process: "BOM Product Process",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(BOMProductProcess, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(BOMProductProcess, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(BOMProductProcess, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    bom_version_id: "BOM Version ID",
    product_id: "Product ID",
    bom_id: "BOM ID",
    bom_product_process: "BOM Product Process",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(BOMProductProcess, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(BOMProductProcess, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
