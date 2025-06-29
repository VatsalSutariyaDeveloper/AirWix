// controllers/CRM/master/reasonMasterController.js

const { ReasonMaster } = require("../../../models/masterModels");
const commonQuery = require("../../../helpers/commonQuery");
const validateRequest = require("../../../helpers/validateRequest");

const MODULE = "Reason Master";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    reason: "Reason",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.status(400).json({ status: false, message: "VALIDATION_ERROR", errors });

  try {
    const result = await commonQuery.createRecord(ReasonMaster, {
      reason: req.body.reason,
      status: req.body.status ?? 0,
      user_id: req.body.user_id,
      branch_id: req.body.branch_id,
      company_id: req.body.company_id
    });

    return res.status(201).json({ status: true, message: "Created", data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ReasonMaster, { status: 0 });
    return res.json({ status: true, data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ReasonMaster, req.params.id);
    if (!record || record.status === 2)
      return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, data: record });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(ReasonMaster, req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: false, message: "Not Found or No Changes" });

    return res.json({ status: true, message: "Updated", data: updated });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Delete (Soft Delete)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ReasonMaster, req.params.id);
    if (!deleted) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (![0, 1, 2].includes(Number(status))) {
      return res.status(400).json({ status: false, message: "Invalid status (0, 1, 2 allowed)" });
    }

    const updated = await commonQuery.updateRecordById(ReasonMaster, req.params.id, { status });
    if (!updated) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, message: `Status updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};
