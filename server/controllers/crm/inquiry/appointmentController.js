const { Appointment } = require("../../../models/crmModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Appointment";

// Create Appointment
exports.create = async (req, res) => {
  const requiredFields = {
    location: "Location",
    full_day_event: "Full Day Event",
    start_time: "Start Time",
    end_time: "End Time",
    subject: "Subject",
    invite_to: "Invite To",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(Appointment, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get All Appointments
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Appointment, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Appointment by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Appointment, req.params.id);
    if (!record || record.status !== 0) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Appointment
exports.update = async (req, res) => {
  const requiredFields = {
    location: "Location",
    full_day_event: "Full Day Event",
    start_time: "Start Time",
    end_time: "End Time",
    subject: "Subject",
    invite_to: "Invite To",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(Appointment, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete Appointment
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(Appointment, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
