const validateRequest = require("../../../helpers/validateRequest");
const { ProductCategory } = require("../../../models");
const commonQuery = require("../../../helpers/commonQuery");

const MODULE = "Product Category";

// Create
exports.createCategory = async (req, res) => {
  const requiredFields = {
    company_id: "Company Name",
    branch_id: "Branch Name",
    user_id: "User",
    product_type_id: "Product Type",
    category_name: "Category Name",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProductCategory,
      fields: ["category_name"],
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const category = await commonQuery.createRecord(ProductCategory, req.body);
    return res.success("CREATE", MODULE, category);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read All (status: 0 only)
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await commonQuery.findAllRecords(ProductCategory, {
      status: 0,
    });
    return res.success("FETCH", MODULE, categories);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Read One
exports.getCategoryById = async (req, res) => {
  try {
    const category = await commonQuery.findOneById(ProductCategory, req.params.id);
    if (!category || category.status !== 0) {
      return res.error("NOT_FOUND");
    }
    return res.success("FETCH", MODULE, category);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update
exports.updateCategory = async (req, res) => {
  const requiredFields = {
    company_id: "Company Name",
    branch_id: "Branch Name",
    user_id: "User",
    product_type_id: "Product Type",
    category_name: "Category Name",
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: ProductCategory,
      fields: ["category_name"],
      excludeId: req.params.id,
    },
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(
      ProductCategory,
      req.params.id,
      req.body
    );
    if (!updated || updated.status === 2) {
      return res.error("NOT_FOUND");
    }
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Soft Delete
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(ProductCategory, req.params.id);
    if (!deleted) {
      return res.error("ALREADY_DELETED");
    }
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
