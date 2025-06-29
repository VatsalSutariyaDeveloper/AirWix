const { Quotation } = require("../../../models/masterModels");
const commonQuery = require("../../../helpers/commonQuery");
const validateRequest = require("../../../helpers/validateRequest");
const sequelize = require("../../../config/database");
const MODULE = "Quotation";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    quotation_no: "Quotation No",
    quotation_date: "Quotation Date",
    company_id: "Company ID",
    contact_person_id: "Contact Person",
    subject: "Subject",
    user_id: "User",
    branch_id: "Branch",
    company_id_ref: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) {
    return res.status(400).json({ status: false, message: "VALIDATION_ERROR", errors });
  }

  try {
    const result = await commonQuery.createRecord(Quotation, {
      ...req.body,
      status: req.body.status ?? 0
    });

    return res.status(201).json({ status: true, message: "Quotation Created", data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const data = await commonQuery.findAllRecords(Quotation, { status: 0 });
    return res.json({ status: true, data });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Quotation, req.params.id);
    if (!record || record.status === 2) {
      return res.status(404).json({ status: false, message: "Quotation Not Found" });
    }

    return res.json({ status: true, data: record });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(Quotation, req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: false, message: "Quotation Not Found or No Changes" });

    return res.json({ status: true, message: "Quotation Updated", data: updated });
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

    const updated = await commonQuery.updateRecordById(Quotation, req.params.id, { status });
    if (!updated) return res.status(404).json({ status: false, message: "Quotation Not Found" });

    return res.json({ status: true, message: `Status updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await sequelize.query(
      `
        UPDATE quotation
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
