const { CityMaster } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "City Name";

exports.create = async (req, res) => {
  const requiredFields = {
    state_id: "State",
    city_name: "City Name",
    user_id: "User",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CityMaster,
      fields: ["city_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(CityMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(CityMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(CityMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.update = async (req, res) => {
  const requiredFields = {
    state_id: "State",
    city_name: "City Name",
    user_id: "User",
    company_id: "Company",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CityMaster,
      fields: ["city_name"],
      excludeId: req.params.id,
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(CityMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(CityMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
