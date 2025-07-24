const { TranspotationMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Transpotation";

// Create Transpotation Master
exports.create = async (req, res) => {
  const requiredFields = {
    transpotation_name: "Transpotation Name",
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: TranspotationMaster,
      fields: ["transpotation_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(TranspotationMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Transpotation Masters
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(TranspotationMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Transpotation Master by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(TranspotationMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Transpotation Master
exports.update = async (req, res) => {
  const requiredFields = {
    transpotation_name: "Transpotation Name",
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: TranspotationMaster,
      fields: ["transpotation_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(TranspotationMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Transpotation Master
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(TranspotationMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
