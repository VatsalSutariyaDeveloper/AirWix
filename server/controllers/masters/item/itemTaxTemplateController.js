const { ItemTaxTemplate } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Item Tax Template";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    tax_name: "Tax Name",
    gst_treatment: "GST Treatment",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemTaxTemplate,
      fields: ["tax_name"],
    },
  });

  // Custom validation: GST Rate required if treatment is Taxable
  if (req.body.gst_treatment === "Taxable" && (req.body.gst_rate === undefined || req.body.gst_rate === "")) {
    errors.push("GST Rate is required for Taxable GST Treatment");
  }

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ItemTaxTemplate, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read all (status = 0 only)
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ItemTaxTemplate, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read one
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ItemTaxTemplate, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
    tax_name: "Tax Name",
    gst_treatment: "GST Treatment",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemTaxTemplate,
      fields: ["tax_name"],
      excludeId: req.params.id,
    },
  });

  if (req.body.gst_treatment === "Taxable" && (req.body.gst_rate === undefined || req.body.gst_rate === "")) {
    errors.push("GST Rate is required for Taxable GST Treatment");
  }

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ItemTaxTemplate, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ItemTaxTemplate, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
