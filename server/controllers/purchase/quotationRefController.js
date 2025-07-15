const { PurchaseQuotationRef } = require("../../models/purchaseModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Purchase Quotation Ref";

// Create Purchase Quotation Ref
exports.create = async (req, res) => {
  const requiredFields = {
    ref_quotation_no: "Ref Quotation No",
    ref_quotation_date: "Ref Quotation Date",
    vender_id: "Vendor",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(PurchaseQuotationRef, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all Purchase Quotation Refs
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PurchaseQuotationRef, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Purchase Quotation Ref by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PurchaseQuotationRef, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Purchase Quotation Ref
exports.update = async (req, res) => {
  const requiredFields = {
    ref_quotation_no: "Ref Quotation No",
    ref_quotation_date: "Ref Quotation Date",
    vender_id: "Vendor",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(PurchaseQuotationRef, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft delete Purchase Quotation Ref
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(PurchaseQuotationRef, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
