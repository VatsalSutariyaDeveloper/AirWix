const { InquiryAttachment } = require("../../../models/masterModels");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");
const validateRequest = require("../../../helpers/validateRequest");
const MODULE = "Inquiry Attachment";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_id: "Inquiry ID",
    attachment_name: "Attachment Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) {
    return res.status(400).json({ status: false, message: "VALIDATION_ERROR", errors });
  }

  try {
    if (!req.file) {
      return res.status(400).json({ status: false, message: "Attachment file is required" });
    }

    const data = {
      inquiry_id: req.body.inquiry_id,
      attachment_name: req.body.attachment_name,
      attachment_file: req.file.filename,
      status: req.body.status ?? 0,
      user_id: req.body.user_id,
      branch_id: req.body.branch_id,
      company_id: req.body.company_id
    };

    const result = await commonQuery.createRecord(InquiryAttachment, data);
    return res.status(201).json({ status: true, message: "Inquiry Attachment Created", data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(InquiryAttachment, { status: 0 });
    return res.json({ status: true, data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(InquiryAttachment, req.params.id);
    if (!record || record.status === 2) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, data: record });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const { id } = req.params;

    let updatedData = {
      ...req.body,
      status: req.body.status ?? 0,
    };

    if (req.file) {
      updatedData.attachment_file = req.file.filename;
    }

    const updated = await commonQuery.updateRecordById(InquiryAttachment, id, updatedData);
    if (!updated) return res.status(404).json({ status: false, message: "Not Found or No Changes" });

    return res.json({ status: true, message: "Updated", data: updated });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};


exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await sequelize.query(`
      UPDATE inquiry_attachment
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [id]
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "Inquiry Attachment Not Found" });
    }

    return res.json({ status: true, message: "Inquiry Attachment Deleted (Soft)" });
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

    const updated = await commonQuery.updateRecordById(InquiryAttachment, req.params.id, { status });
    if (!updated) return res.status(404).json({ status: false, message: "Not Found" });

    return res.json({ status: true, message: `Status updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};
