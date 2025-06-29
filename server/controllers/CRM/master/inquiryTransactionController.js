const { InquiryTransaction } = require("../../../models/masterModels");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database"); // ✅ Corrected import

const validateRequest = require("../../../helpers/validateRequest");
const MODULE = "Inquiry Transaction";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_id: "Inquiry",
    product_id: "Product",
    product_unit_id: "Product Unit",
    quantity: "Quantity",
    rate: "Rate",
    amount: "Amount",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) {
    return res.status(400).json({ status: false, message: "VALIDATION_ERROR", errors });
  }

  try {
    const data = {
      ...req.body,
      status: req.body.status ?? 0
    };

    const result = await commonQuery.createRecord(InquiryTransaction, data);
    return res.status(201).json({ status: true, message: "Inquiry Transaction Created Successfully", data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(InquiryTransaction, { status: 0 });
    return res.json({ status: true, message: "All Inquiry Transactions Fetched", data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(InquiryTransaction, req.params.id);
    if (!record || record.status === 2) {
      return res.status(404).json({ status: false, message: "Inquiry Transaction Not Found" });
    }

    return res.json({ status: true, message: "Inquiry Transaction Fetched", data: record });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(InquiryTransaction, req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ status: false, message: "Inquiry Transaction Not Found or No Changes" });
    }

    return res.json({ status: true, message: "Inquiry Transaction Updated", data: updated });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Delete (Soft)
exports.delete = async (req, res) => {
  const { id } = req.params;

  try {
    const [result] = await sequelize.query(`
      UPDATE inquiry_transaction
      SET status = 2, updated_at = NOW()
      WHERE id = ?
    `, {
      replacements: [id]
    });

    if (result.affectedRows === 0) {
      return res.status(404).json({ status: false, message: "Inquiry Transaction Not Found" });
    }

    return res.json({ status: true, message: "Inquiry Transaction Deleted" });
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

    const updated = await commonQuery.updateRecordById(InquiryTransaction, req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ status: false, message: "Inquiry Transaction Not Found" });
    }

    return res.json({ status: true, message: `Inquiry Transaction Status Updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};
