const { ItemMasterFieldValue } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Item Master Field Value";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    item_field_id: "Item Field ID",
    field_value_name: "Field Value Name",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemMasterFieldValue,
      fields: ["field_value_name"],
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ItemMasterFieldValue, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read All (status: 0)
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ItemMasterFieldValue, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read One
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ItemMasterFieldValue, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    item_field_id: "Item Field ID",
    field_value_name: "Field Value Name",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemMasterFieldValue,
      fields: ["field_value_name"],
      excludeId: req.params.id,
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ItemMasterFieldValue, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ItemMasterFieldValue, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
