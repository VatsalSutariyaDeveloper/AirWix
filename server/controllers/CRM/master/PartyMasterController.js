

const { PartyMaster } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");

const MODULE = "Party Master";

exports.create = async (req, res) => {
  const requiredFields = {
    party_code: "Party Code",
    party_category_id: "Party Category",
    company_name: "Company Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined || req.body.status === null) {
      req.body.status = 0;
    }

    const result = await commonQuery.createRecord(PartyMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    console.error("Create Error:", err);
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PartyMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PartyMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(PartyMaster, req.params.id, req.body);
    if (!updated) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      UPDATE party_master SET status = 2, updated_at = NOW() WHERE id = ?
    `, {
      replacements: [req.params.id]
    });

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    if (![0, 1, 2].includes(Number(status))) {
      return res.error("VALIDATION_ERROR", {
        message: "Invalid or missing status. Allowed: 0, 1, 2"
      });
    }

    const [result] = await sequelize.query(`
      UPDATE party_master SET status = ?, updated_at = NOW() WHERE id = ?
    `, {
      replacements: [status, id]
    });

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
