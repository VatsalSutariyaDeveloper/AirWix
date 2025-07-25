const { PurchaseQuotation } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Purchase Quotation";

// Create Purchase Quotation
exports.create = async (req, res) => {
  const requiredFields = {
    purchase_quotation_no: "Quotation No",
    purchase_quotation_date: "Quotation Date",
    vendor_id: "Vendor",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: PurchaseQuotation,
      fields: ["purchase_quotation_no"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(PurchaseQuotation, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Purchase Quotations
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PurchaseQuotation, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Purchase Quotation by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PurchaseQuotation, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Purchase Quotation
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {}, {
    uniqueCheck: {
      model: PurchaseQuotation,
      fields: ["purchase_quotation_no"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(PurchaseQuotation, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Purchase Quotation
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(PurchaseQuotation, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
