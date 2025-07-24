const { IndentApproval } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Indent Approval";

// Create Indent Approval
exports.create = async (req, res) => {
  // Validate required fields
  const requiredFields = {
    approval_no: "Approval No",
    approval_date: "Approval Date",
    rp_id: "Production Request ID",
    approve_unit: "Approve Unit",
    approve_qty: "Approve Quantity",
    product_base_unit: "Product Base Unit",
    product_base_qty: "Product Base Quantity",
    product_convert_unit: "Product Convert Unit",
    product_convert_qty: "Product Convert Quantity",
    delivery_date: "Delivery Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(IndentApproval, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Indent Approvals
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(IndentApproval, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Indent Approval by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(IndentApproval, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Indent Approval
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(IndentApproval, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete Indent Approval (soft delete)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(IndentApproval, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
