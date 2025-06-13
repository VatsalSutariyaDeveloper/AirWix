const { CountryMaster } = require("../../models/masterModels");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");

const MODULE = "Country Name";

exports.create = async (req, res) => {
  const requiredFields = {
    country_name: "Country Name",
    country_initial: "Country Initial",
    country_code: "Country Code",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CountryMaster,
      fields: ["country_name"]
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(CountryMaster, req.body);
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(CountryMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(CountryMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.update = async (req, res) => {
  const requiredFields = {
    country_name: "Country Name",
    country_initial: "Country Initial",
    country_code: "Country Code",
    user_id: "User",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: CountryMaster,
      fields: ["country_name"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(CountryMaster, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(CountryMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
