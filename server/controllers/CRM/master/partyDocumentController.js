const { PartyDocument } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");
const MODULE = "Party Document";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    document_name: "Document Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.status(400).json({ status: false, message: "VALIDATION_ERROR", errors });

  try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: "File is required" });
    }

    const data = {
      document_name: req.body.document_name,
      document_file: req.file.filename,
      status: req.body.status ?? 0,
      user_id: req.body.user_id,
      branch_id: req.body.branch_id,
      company_id: req.body.company_id
    };

    const newDoc = await commonQuery.createRecord(PartyDocument, data);

    res.status(201).json({
      status: true,
      message: "Document uploaded successfully",
      data: newDoc
    });
  } catch (error) {
    res.status(500).json({
      status: false,
      message: "SERVER_ERROR",
      error: error.message
    });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(PartyDocument, { status: 0 });
    return res.json({ status: true, data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(PartyDocument, req.params.id);
    if (!record || record.status === 2) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, data: record });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
// Update
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    // Find existing record first
    const existing = await PartyDocument.findByPk(id);
    if (!existing || existing.status === 2) {
      return res.status(404).json({ status: false, message: "Record not found or deleted" });
    }

    // Prepare updated data
    const updatedData = {
      document_name: req.body.document_name || existing.document_name,
      status: req.body.status ?? existing.status,
      user_id: req.body.user_id || existing.user_id,
      branch_id: req.body.branch_id || existing.branch_id,
      company_id: req.body.company_id || existing.company_id
    };

    // ✅ Check if new file uploaded
    if (req.file) {
      updatedData.document_file = req.file.filename;
    }

    // Update using commonQuery
    const updated = await commonQuery.updateRecordById(PartyDocument, id, updatedData);

    return res.json({ status: true, message: "Updated successfully", data: updated });

  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Soft Delete
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await commonQuery.softDeleteById(PartyDocument, id);

    if (!deleted) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, message: "Deleted" });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (![0, 1, 2].includes(Number(status))) {
      return res.status(400).json({ status: false, message: "Invalid status (0, 1, 2 allowed)" });
    }

    const updated = await commonQuery.updateRecordById(PartyDocument, id, { status });
    if (!updated) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, message: `Status updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};
