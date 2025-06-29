const { PartyContactPerson } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");

const MODULE = "Party Contact Person";

// ✅ Create
exports.create = async (req, res) => {
  const requiredFields = {
    party_id: "Party",
    first_name: "First Name"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined || req.body.status === '') {
      req.body.status = 0;
    }

    const result = await commonQuery.createRecord(PartyContactPerson, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PartyContactPerson, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PartyContactPerson, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Update
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {
    first_name: "First Name"
  });
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(PartyContactPerson, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Soft Delete
exports.delete = async (req, res) => {
  try {
    const [result] = await sequelize.query(`
      UPDATE party_contact_person_details
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, { replacements: [req.params.id] });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND", { message: "Contact person not found" });
    }

    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// ✅ Update Status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status === undefined || ![0, 1, 2].includes(Number(status))) {
    return res.error("VALIDATION_ERROR", {
      message: "Invalid status. Allowed: 0, 1, 2"
    });
  }

  try {
    const [result] = await sequelize.query(`
      UPDATE party_contact_person_details
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `, { replacements: [status, id] });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND", { message: "Contact person not found" });
    }

    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
