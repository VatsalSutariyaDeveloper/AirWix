const { ItemMasterFieldName } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Item Master Field Name";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    item_field_name: "Item Field Name",
    db_field_name: "DB Field Name",
    field_type: "Field Type"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemMasterFieldName,
      fields: ["db_field_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ItemMasterFieldName, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ItemMasterFieldName, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ItemMasterFieldName, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    item_field_name: "Item Field Name",
    db_field_name: "DB Field Name",
    field_type: "Field Type"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemMasterFieldName,
      fields: ["db_field_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ItemMasterFieldName, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ItemMasterFieldName, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
