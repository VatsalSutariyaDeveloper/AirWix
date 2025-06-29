

const { TermsCategory } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");

const MODULE = "Terms Category";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    category_name: "Category Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: TermsCategory,
      fields: ["category_name"],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    if (req.body.status === undefined || req.body.status === null) {
      req.body.status = 0;
    }

    const result = await commonQuery.createRecord(TermsCategory, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(TermsCategory, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(TermsCategory, req.params.id);
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
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: TermsCategory,
      fields: ["category_name"],
      excludeId: req.params.id,
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(TermsCategory, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (Soft Delete)
exports.delete = async (req, res) => {
  try {
    const [result] = await sequelize.query(
      `UPDATE terms_category SET status = 2, updated_at = NOW() WHERE id = ?`,
      { replacements: [req.params.id] }
    );

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  if (status === undefined || ![0, 1, 2].includes(Number(status))) {
    return res.error("VALIDATION_ERROR", {
      message: "Invalid or missing status. Allowed: 0, 1, 2",
    });
  }

  try {
    const [result] = await sequelize.query(
      `UPDATE terms_category SET status = ?, updated_at = NOW() WHERE id = ?`,
      { replacements: [status, id] }
    );

    if (result.affectedRows === 0) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, { id, status });
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
