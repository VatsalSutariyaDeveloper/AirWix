// controllers/partyTermsConditionController.js

const { PartyTermsCondition } =  require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");

const MODULE = "Party Terms Condition";

// ✅ Create
exports.create = async (req, res) => {
  const requiredFields = {
    terms_name: "Terms Name",
    for_type: "For (Domestic / Export)"
  };

  const errors = await validateRequest(req.body, requiredFields);

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined) req.body.status = 0;
    if (!req.body.allow_to_change) req.body.allow_to_change = false;

    const result = await commonQuery.createRecord(PartyTermsCondition, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PartyTermsCondition, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PartyTermsCondition, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(PartyTermsCondition, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Soft Delete
exports.delete = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `UPDATE party_terms_condition_master SET status = 2, updated_at = NOW() WHERE id = ?`,
      { replacements: [req.params.id] }
    );

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Update Status
exports.updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  if (status === undefined || ![0, 1, 2].includes(Number(status))) {
    return res.error("VALIDATION_ERROR", {
      message: "Invalid or missing status. Allowed: 0, 1, 2"
    });
  }

  try {
    const [result] = await sequelize.query(
      `UPDATE party_terms_condition_master SET status = ?, updated_at = NOW() WHERE id = ?`,
      { replacements: [status, id] }
    );

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
