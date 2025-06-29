const { MasterCategory } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database"); // ✅ Corrected import

const MODULE = "Master Category";


exports.create = async (req, res) => {
  const requiredFields = {
    category_name: "Category Name",
    priority: "Priority",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: MasterCategory,
      fields: ["category_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    // ✅ Default status if not given
    if (req.body.status === undefined || req.body.status === null || req.body.status === '') {
      req.body.status = 0;
    }

    // ✅ Make sure parent_category_id is handled gracefully (optional)
    if (!req.body.parent_category_id) {
      req.body.parent_category_id = null;
    }

    // ✅ Optional: Log current database
    const [dbName] = await sequelize.query("SELECT DATABASE() AS dbname");
    console.log("📌 Current connected DB:", dbName[0].dbname);

    // ✅ Create record with parent_category_id
    const result = await commonQuery.createRecord(MasterCategory, req.body);

    return res.success("CREATE", MODULE, result);
  } catch (err) {
    console.error("❌ Create Master Category Error:", err);
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(MasterCategory, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(MasterCategory, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    category_name: "Category Name",
    priority: "Priority",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: MasterCategory,
      fields: ["category_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(MasterCategory, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    // ✅ Custom update instead of commonQuery
    const [result] = await sequelize.query(`
      UPDATE master_category
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [id]
    });

    // ✅ result[1] holds affectedRows in Sequelize
    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND", { message: "Master Category not found" });
    }

    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const validStatus = [0, 1, 2];

    if (status === undefined || !validStatus.includes(Number(status))) {
      return res.error("VALIDATION_ERROR", {
        message: "Invalid or missing status. Allowed: 0 (Active), 1 (Inactive), 2 (Deleted)"
      });
    }

    const [result] = await sequelize.query(`
      UPDATE master_category
      SET status = ?, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [status, id]
    });

    if (result.affectedRows === 0) {
      return res.error("NOT_FOUND", { message: "Master Category not found" });
    }

    return res.success("UPDATE", MODULE, { id, status });

  } catch (err) {
    console.error("❌ Status Update Error:", err);
    return res.error("SERVER_ERROR", { error: err.message });
  }
};