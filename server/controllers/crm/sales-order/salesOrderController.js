const { SalesOrder } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Sales Order";

// Create Sales Order
exports.create = async (req, res) => {
  const requiredFields = {
    sales_order_no: "Sales Order No",
    sales_order_date: "Sales Order Date",
    customer_id: "Customer ID",
    grand_total: "Grand Total",
    company_id: "Company",
    branch_id: "Branch",
    user_id: "User",
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(SalesOrder, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Sales Orders
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(SalesOrder, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Sales Order by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(SalesOrder, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Sales Order
exports.update = async (req, res) => {
  const errors = await validateRequest(req.body, {}, {});
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(SalesOrder, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete Sales Order
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(SalesOrder, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
