const { PartyAddess } = require("../../../models/masterModels");
const sequelize = require("../../../config/database");
const commonQuery = require("../../../helpers/commonQuery");
const validateRequest = require("../../../helpers/validateRequest");

const MODULE = "Party Address";

exports.create = async (req, res) => {
  const requiredFields = {
    party_id: "Party",
    address: "Address",
    city_id: "City",
    state_id: "State",
    country_id: "Country",
    pincode: "Pincode"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined) req.body.status = 0;
    if (req.body.is_default === undefined) req.body.is_default = 0;

    const result = await commonQuery.createRecord(PartyAddess, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PartyAddess, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PartyAddess, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(PartyAddess, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      UPDATE party_address_details
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, { replacements: [req.params.id] });

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (![0, 1, 2].includes(Number(status))) {
    return res.error("VALIDATION_ERROR", {
      message: "Invalid status. Allowed: 0 (Active), 1 (Inactive), 2 (Deleted)"
    });
  }

  try {
    const [result] = await sequelize.query(`
      UPDATE party_address_details
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `, { replacements: [status, id] });

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
