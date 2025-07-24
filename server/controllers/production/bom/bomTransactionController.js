const { BOMTransaction, BOM, ProductBomVersion } = require("../../../models/productionModels");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");
const { updateSeries  } = require("../../../helpers/functions/transaction_functions");

const MODULE = "BOM Transaction";

exports.create = async (req, res) => {
  const requiredFields = {
    product_id: "Product ID",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID"
  };

  // Validate required fields
  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  const input = req.body;
  const transaction = await sequelize.transaction();

  try {
    let { parent_bom_id, parent_bom_version_id } = input;

    // Check if we need to auto-create BOM Version and BOM
    const shouldCreateBomVersion = !parent_bom_version_id || parent_bom_version_id == 0;
    const shouldCreateBom = !parent_bom_id || parent_bom_id == 0;

    if (shouldCreateBomVersion && shouldCreateBom) {
      // 🔹 Create Product BOM Version first
      const newBomVersion = await commonQuery.createRecord(ProductBomVersion, {
        series_id: input.series_id,
        product_id: input.product_id,
        bom_version_no: input.bom_version_no || `Auto-V${Date.now()}`,
        version_name: input.version_name,
        bom_type: input.bom_type || 0,
        is_default_bom: input.is_default_bom || 0,
        bom_active_status: input.bom_active_status || 1,
        bom_version_date: input.bom_version_date || input.bom_date || new Date(),
        unit: input.product_base_unit,
        unit_quantity: input.product_base_quantity,
        conversion_unit: input.product_conversion_unit,
        conversion_quantity: input.product_conversion_quantity,
        drawing_id: input.drawing_id,
        revision_id: input.revision_id,
        user_id: input.user_id,
        branch_id: input.branch_id,
        company_id: input.company_id
      }, transaction);

      parent_bom_version_id = newBomVersion.id;
 // 🔹 Update series ONLY IF ProductBomVersion was just created
      if (input.series_id) {
        await updateSeries({ series_id: input.series_id }, transaction);
      }
      // 🔹 Then create BOM
      const newBOM = await commonQuery.createRecord(BOM, {
        bom_version_id: parent_bom_version_id,
        bom_no: input.bom_no || `BOM-${Date.now()}`,
        bom_date: input.bom_date || new Date(),
        bom_product_id: input.product_id,
        bom_type: input.bom_type || 0,
        bom_quantity: input.product_base_quantity,
        product_base_unit: input.product_base_unit,
        product_base_quantity: input.product_base_quantity,
        product_conversion_unit: input.product_conversion_unit,
        product_conversion_quantity: input.product_conversion_quantity,
        total_standard_quantity: input.total_standard_quantity || 0,
        conversion_factor: input.conversion_factor || 0,
        remark: input.remark || null,
        user_id: input.user_id,
        branch_id: input.branch_id,
        company_id: input.company_id
      }, transaction);

      parent_bom_id = newBOM.id;
    }

    // 🔹 Finally, create the BOMTransaction using resolved parent IDs
    const result = await commonQuery.createRecord(BOMTransaction, {
      parent_bom_id,
      parent_bom_version_id,
      ...input,
    }, transaction);

    await transaction.commit();
    return res.success("CREATE", MODULE, result);

  } catch (err) {
    await transaction.rollback();
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// const { BOMTransaction, BOM, ProductBomVersion } = require("../../../models/productionModels");
// const validateRequest = require("../../../helpers/validateRequest");
// const commonQuery = require("../../../helpers/commonQuery");

// const MODULE = "BOM Transaction";

// exports.create = async (req, res) => {
//   const requiredFields = {
//     bom_id: "BOM ID",
//     bom_version_id: "BOM Version ID",
//     product_id: "Product ID",
//     user_id: "User ID",
//     branch_id: "Branch ID",
//     company_id: "Company ID"
//   };

//   const errors = await validateRequest(req.body, requiredFields);
//   if (errors.length) return res.error("VALIDATION_ERROR", { errors });

//   const {
//     product_id,
//     bom_product_id, // for BOM creation
//     bom_no,
//     bom_version_no,
//     bom_date,
//     user_id,
//     branch_id,
//     company_id
//   } = req.body;

//   try {
//     let { parent_bom_id, parent_bom_version_id } = req.body;

//     // Auto-create ProductBomVersion and BOM if not provided
//     if (!parent_bom_version_id) {
//       const newBomVersion = await commonQuery.createRecord(ProductBomVersion, {
//         product_id,
//         bom_version_no: bom_version_no || `Auto-V${Date.now()}`, // default name if not sent
//         user_id,
//         branch_id,
//         company_id
//       });
//       parent_bom_version_id = newBomVersion.id;
//     }

//     if (!parent_bom_id) {
//       const newBOM = await commonQuery.createRecord(BOM, {
//         bom_version_id: parent_bom_version_id,
//         bom_no: bom_no || `BOM-${Date.now()}`,
//         bom_date: bom_date || new Date(),
//         bom_product_id: product_id,
//         user_id,
//         branch_id,
//         company_id
//       });
//       parent_bom_id = newBOM.id;
//     }

//     const result = await commonQuery.createRecord(BOMTransaction, {
//       ...req.body,
//       parent_bom_id,
//       parent_bom_version_id
//     });

//     return res.success("CREATE", MODULE, result);
//   } catch (err) {
//     return res.error("SERVER_ERROR", { error: err.message });
//   }
// };


// Get All
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(BOMTransaction, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(BOMTransaction, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.update = async (req, res) => {
  const requiredFields = {
    bom_id: "BOM ID",
    bom_version_id: "BOM Version ID",
    product_id: "Product ID",
    user_id: "User ID",
    branch_id: "Branch ID",
    company_id: "Company ID"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(BOMTransaction, req.params.id, req.body);
    if (!updated || updated.status === 2) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(BOMTransaction, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
