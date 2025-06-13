const { DrawingMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Drawing";

exports.create = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    drawing_number: "Drawing Number",
    title: "Title",
    size: "Size",
    scale: "Scale",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: DrawingMaster,
      fields: ["drawing_number"],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(DrawingMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(DrawingMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(DrawingMaster, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.update = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    drawing_number: "Drawing Number",
    title: "Title",
    size: "Size",
    scale: "Scale",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: DrawingMaster,
      fields: ["drawing_number"],
      excludeId: req.params.id,
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(DrawingMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(DrawingMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
