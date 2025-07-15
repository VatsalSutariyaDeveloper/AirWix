const { SupplierQuotationDetails } = require("../../models/purchaseModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Supplier Quotation Details";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    quotation_ref_id: "Quotation Ref ID",
    vender_id: "Vender",
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    delivery_date: "Delivery Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(SupplierQuotationDetails, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get all
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(SupplierQuotationDetails, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(SupplierQuotationDetails, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    quotation_ref_id: "Quotation Ref ID",
    vender_id: "Vender",
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    delivery_date: "Delivery Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(SupplierQuotationDetails, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete (Soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(SupplierQuotationDetails, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
