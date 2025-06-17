const { BusinessTypeMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Business Type";

/**
 * Create business type
 */
exports.create = async (req, res) => {
  const requiredFields = {
    business_type_name: "Business Type Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: BusinessTypeMaster,
      fields: ["business_type_name"]
    }
  });
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(BusinessTypeMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get all active business types
 */
exports.getAll = async (req, res) => {
  try {
    const data = await commonQuery.findAllRecords(BusinessTypeMaster, { status: 0 });
    return res.success("FETCH", MODULE, data);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get business type by ID
 */
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(BusinessTypeMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Update business type
 */
exports.update = async (req, res) => {
  const requiredFields = {
    business_type_name: "Business Type Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

    const errors = await validateRequest(req.body, requiredFields, {
        uniqueCheck: {
        model: BusinessTypeMaster,
        fields: ["business_type_name"],
        excludeId: req.params.id
        }
    });
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(BusinessTypeMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Soft delete business type
 */
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(BusinessTypeMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
