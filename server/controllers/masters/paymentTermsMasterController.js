const { PaymentTermsMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Payment Terms Master";

// Create Payment Terms
exports.create = async (req, res) => {
  const requiredFields = {
    terms_title: "Terms Title",
    payment_day: "Payment Day",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: PaymentTermsMaster,
      fields: ["terms_title"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(PaymentTermsMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all active Payment Terms
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PaymentTermsMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Payment Terms by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PaymentTermsMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Payment Terms
exports.update = async (req, res) => {
  const requiredFields = {
    terms_title: "Terms Title",
    payment_day: "Payment Day",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: PaymentTermsMaster,
      fields: ["terms_title"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(PaymentTermsMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (Soft Delete) Payment Terms
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(PaymentTermsMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
