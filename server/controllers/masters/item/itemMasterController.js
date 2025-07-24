const { ItemMaster } = require("../../../models/masterModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const { uploadImage } = require("../../../helpers/fileUpload");

const MODULE = "Item Name";

exports.create = async (req, res) => {

  const requiredFields = {
    item_code: "Item Code",
    item_name: "Item Name",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  if (req.file) {
    req.body.item_image = req.file.filename;
  }

  // Step 2: Now req.body is available
  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ItemMaster,
      fields: ["item_code", "item_name"]
    },
    imageFields: ["item_image"]
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const result = await commonQuery.createRecord(ItemMaster, req.body);
    uploadImage(req, "items", "item_image");
    return res.success("CREATE", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// GET ALL
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(ItemMaster, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// GET BY ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(ItemMaster, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// UPDATE
exports.update = async (req, res) => {

    const requiredFields = {
      item_code: "Item Code",
      item_name: "Item Name",
      user_id: "User",
      branch_id: "Branch",
      company_id: "Company"
    };

    if (req.file) {
      req.body.item_image = req.file.filename;
    }

    const errors = await validateRequest(req.body, requiredFields, {
      uniqueCheck: {
        model: ItemMaster,
        fields: ["item_code", "item_name"],
        excludeId: req.params.id
      },
      imageFields: ["item_image"]
    });

    if (errors.length) return res.error("VALIDATION_ERROR", { errors });

    try {
      const updated = await commonQuery.updateRecordById(ItemMaster, req.params.id, req.body);
      if (!updated || updated.status === 2) return res.error("NOT_FOUND");
      return res.success("UPDATE", MODULE, updated);
    } catch (err) {
      return res.error("SERVER_ERROR", { error: err.message });
    }
};

// DELETE (Soft)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ItemMaster, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
