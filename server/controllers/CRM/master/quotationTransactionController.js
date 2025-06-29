const { QuotationTransaction } = require("../../../models/masterModels");
const commonQuery = require("../../../helpers/commonQuery");
const validateRequest = require("../../../helpers/validateRequest");
const sequelize = require("../../../config/database");
const MODULE = "Quotation Transaction";

// Create
exports.create = async (req, res) => {
  try {
    const result = await commonQuery.createRecord(QuotationTransaction, {
      ...req.body,
      status: req.body.status ?? 0
    });

    res.status(201).json({ status: true, message: "Quotation Transaction Created", data: result });
  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(QuotationTransaction, { status: 0 });
    res.json({ status: true, data: result });
  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(QuotationTransaction, req.params.id);
    if (!record || record.status === 2) return res.status(404).json({ status: false, message: "Not Found" });

    res.json({ status: true, data: record });
  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(QuotationTransaction, req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: false, message: "Not Found or No Changes" });

    res.json({ status: true, message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (![0, 1, 2].includes(Number(status))) {
      return res.status(400).json({ status: false, message: "Invalid status" });
    }

    const updated = await commonQuery.updateRecordById(QuotationTransaction, req.params.id, { status });
    if (!updated) return res.status(404).json({ status: false, message: "Not Found" });

    res.json({ status: true, message: `Status updated to ${status}` });
  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await sequelize.query(
      `
        UPDATE quotation_transaction
        SET status = 2, updated_at = NOW()
        WHERE id = ?
      `,
      {
        replacements: [id]
      }
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({
        status: false,
        message: `${MODULE} not found`
      });
    }

    return res.status(200).json({
      status: true,
      message: `${MODULE} deleted (soft)`
    });
  } catch (err) {
    return res.status(500).json({
      status: false,
      message: "SERVER_ERROR",
      error: err.message
    });
  }
};
