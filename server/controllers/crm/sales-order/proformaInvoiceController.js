const { ProformaInvoice } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Proforma Invoice";

/**
 * Create a new Proforma Invoice
 */
exports.create = async (req, res) => {
  const requiredFields = {
    series_id: "Series",
    proforma_invoice_no: "Invoice No",
    proforma_invoice_date: "Invoice Date",
    customer_id: "Customer",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProformaInvoice,
      fields: ["proforma_invoice_no"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ProformaInvoice, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get all Proforma Invoices (status = 0)
 */
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ProformaInvoice, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Get Proforma Invoice by ID
 */
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ProformaInvoice, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Update Proforma Invoice by ID
 */
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {}, {
    uniqueCheck: {
      model: ProformaInvoice,
      fields: ["proforma_invoice_no"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(ProformaInvoice, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

/**
 * Soft delete Proforma Invoice by ID
 */
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ProformaInvoice, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
