const { Appointment } = require("../../../models/masterModels");
const commonQuery = require("../../../helpers/commonQuery");
const validateRequest = require("../../../helpers/validateRequest");
const MODULE = "Appointment";

// Create
exports.create = async (req, res) => {
  const requiredFields = {
    location: "Location",
    start_time: "Start Time",
    end_time: "End Time",
    subject: "Subject",
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
      location: req.body.location,
      full_day_event: req.body.full_day_event ?? false,
      start_time: req.body.start_time,
      end_time: req.body.end_time,
      subject: req.body.subject,
      remark: req.body.remark,
      invite_to: req.body.invite_to,
      ref_type_id: req.body.ref_type_id,
      ref_title: req.body.ref_title,
      alert_type: req.body.alert_type,
      status: req.body.status ?? 0,
      user_id: req.body.user_id,
      branch_id: req.body.branch_id,
      company_id: req.body.company_id
    };

    const result = await commonQuery.createRecord(Appointment, data);
    return res.status(201).json({ status: true, message: "Appointment created", data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Appointment, { status: 0 });
    return res.json({ status: true, data: result });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Get By ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Appointment, req.params.id);
    if (!record || record.status === 2) {
      return res.status(404).json({ status: false, message: "Appointment Not Found" });
    }

    return res.json({ status: true, data: record });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  try {
    const updated = await commonQuery.updateRecordById(Appointment, req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ status: false, message: "Appointment Not Found or No Changes" });
    }

    return res.json({ status: true, message: "Appointment updated", data: updated });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Update Status
exports.updateStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (![0, 1, 2].includes(Number(status))) {
      return res.status(400).json({ status: false, message: "Invalid status (allowed: 0, 1, 2)" });
    }

    const updated = await commonQuery.updateRecordById(Appointment, req.params.id, { status });
    if (!updated) {
      return res.status(404).json({ status: false, message: "Appointment Not Found" });
    }

    return res.json({ status: true, message: `Status updated to ${status}` });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};

// Soft Delete (Appointment - Status = 2)
exports.delete = async (req, res) => {
  try {
    const { id } = req.params;

    const [affectedRows] = await Appointment.update(
      {
        status: 2,
        updated_at: new Date()
      },
      {
        where: { id }
      }
    );

    if (affectedRows === 0) {
      return res.status(404).json({ status: false, message: "Appointment Not Found" });
    }

    return res.json({ status: true, message: "Appointment Deleted (Soft)" });
  } catch (err) {
    return res.status(500).json({ status: false, message: "SERVER_ERROR", error: err.message });
  }
};
