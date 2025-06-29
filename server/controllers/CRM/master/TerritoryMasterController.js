const { TerritoryMaster } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");

const MODULE = "Territory Master";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    territory_name: "Territory Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined || req.body.status === null || req.body.status === '') {
      req.body.status = 0;
    }

    if (!req.body.parent_territory_id) {
      req.body.parent_territory_id = null;
    }

    const [dbName] = await sequelize.query("SELECT DATABASE() AS dbname");
    console.log("📌 Current connected DB:", dbName[0].dbname);

    const result = await commonQuery.createRecord(TerritoryMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    console.error("❌ Create Territory Error:", err);
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(TerritoryMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(TerritoryMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    territory_name: "Territory Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(TerritoryMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (Soft Delete)
exports.delete = async (req, res) => {
  const { id } = req.params;
  try {
    const [result] = await sequelize.query(`
      UPDATE territory_master
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [id]
    });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND", { message: "Territory not found" });
    }

    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatus = [0, 1, 2];
    if (status === undefined || !validStatus.includes(Number(status))) {
      return res.error("VALIDATION_ERROR", {
        message: "Invalid or missing status. Allowed: 0, 1, 2"
      });
    }

    const [result] = await sequelize.query(`
      UPDATE territory_master
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [status, id]
    });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND", { message: "Territory not found" });
    }

    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
