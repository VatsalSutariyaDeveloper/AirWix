const { PartyConsignee } = require("../../../models/masterModels");
const sequelize = require("../../../config/database");
const commonQuery = require("../../../helpers/commonQuery");
const validateRequest = require("../../../helpers/validateRequest");

const MODULE = "Party Consignee";

// CREATE
exports.create = async (req, res) => {
  const requiredFields = {
    company_name: "Company Name",
    person_name: "Person Name"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined) req.body.status = 0;

    const result = await commonQuery.createRecord(PartyConsignee, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// GET ALL
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PartyConsignee, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PartyConsignee, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {
    company_name: "Company Name",
    person_name: "Person Name",
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(PartyConsignee, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// DELETE (Soft)
exports.delete = async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      UPDATE party_consignee
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [req.params.id]
    });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND");
    }

    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// UPDATE STATUS
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (![0, 1, 2].includes(Number(status))) {
    return res.error("VALIDATION_ERROR", { message: "Invalid status" });
  }

  try {
    const [result] = await sequelize.query(`
      UPDATE party_consignee
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [status, id]
    });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND");
    }

    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
