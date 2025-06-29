const { Inquiry } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const MODULE = "Inquiry";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    inquiry_no: "Inquiry No",
    inquiry_date: "Inquiry Date",
    party_id: "Party",
    assign_to: "Assign User",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.status(400).json({ status: false, message: "VALIDATION_ERROR", errors });

  try {
    const result = await commonQuery.createRecord(Inquiry, {
      ...req.body,
      status: req.body.status ?? 0
    });

 res.status(201).json({
  status: true,
  message: `Inquiry Created Successfully (Inquiry No: ${result.inquiry_no})`,
  data: result
});

  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Inquiry, { status: 0 });
  res.json({
  status: true,
  message: "All Inquiries Fetched Successfully",
  data: result
});

  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Inquiry, req.params.id);
    if (!record || record.status === 2) return res.status(404).json({ status: false, message: "Not Found" });
res.json({
  status: true,
  message: "Inquiry Fetched Successfully",
  data: record
});

  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(Inquiry, req.params.id, req.body);
    if (!updated) return res.status(404).json({ status: false, message: "Not Found or No Changes" });

   res.json({
  status: true,
  message: "Inquiry Updated Successfully",
  data: updated
});

  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(Inquiry, req.params.id);
    if (!deleted) return res.status(404).json({ status: false, message: "Not Found" });

    res.json({
  status: true,
  message: "Inquiry Deleted Successfully"
});

  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    if (![0, 1, 2].includes(Number(status))) {
      return res.status(400).json({ status: false, message: "Invalid status (0, 1, 2 allowed)" });
    }

    const updated = await commonQuery.updateRecordById(Inquiry, req.params.id, { status });
    if (!updated) return res.status(404).json({ status: false, message: "Not Found" });

    rres.json({
  status: true,
  message: `Inquiry Status Updated to ${status}`
});

  } catch (err) {
    res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};
