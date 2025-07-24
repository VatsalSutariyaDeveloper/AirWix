const { Indent, IndentTransaction } = require("../../models");
const validateRequest = require("../../helpers/validateRequest");
const commonQuery = require("../../helpers/commonQuery");
const sequelize = require("../../config/database");
const { updateSeries } = require("../../helpers/functions/transaction_functions");

const MODULE = "Indent";

exports.create = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { indent_transactions, ...indentData } = req.body;

    // 1. Validate Indent required fields
    const indentErrors = await validateRequest(indentData, {
      series_id: "Series ID",
      indent_no: "Indent No",
      indent_date: "Indent Date",
      user_id: "User",
      branch_id: "Branch",
      company_id: "Company",
    }, {
      uniqueCheck: {
        model: Indent,
        fields: ["indent_no"]
      }
    });

    if (indentErrors.length) {
      return res.error("VALIDATION_ERROR", { errors: indentErrors });
    }

    // 2. Validate at least one transaction exists
    if (!Array.isArray(indent_transactions) || !indent_transactions.length) {
      return res.error("VALIDATION_ERROR", {
        errors: ["At least one Indent Transaction is required."]
      });
    }

    // 3. Create Indent
    const indent = await commonQuery.createRecord(Indent, indentData, t);

    // 4. Loop and create Indent Transactions
    for (const trn of indent_transactions) {
      const trnData = {
        ...trn,
        indent_id: indent.id,
        user_id: indent.user_id,
        branch_id: indent.branch_id,
        company_id: indent.company_id,
      };

      const trnErrors = await validateRequest(trnData, {
        product_id: "Product",
        unit_id: "Unit",
        product_quantity: "Quantity",
        user_id: "User",
        branch_id: "Branch",
        company_id: "Company"
      });

      if (trnErrors.length) {
        await t.rollback();
        return res.error("VALIDATION_ERROR", {
          errors: [`Transaction Error (Product ID: ${trn.product_id}): ` + trnErrors.join(", ")]
        });
      }

      await commonQuery.createRecord(IndentTransaction, trnData, t);
    }
    //update the series
    await updateSeries(indentData.series_id,t);

    await t.commit();
    return res.success("CREATE", MODULE, indent);

  } catch (err) {
    await t.rollback();
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Get All Indents
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(Indent, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Indent by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(Indent, req.params.id);
    if (!record || record.status === 3) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Indent
exports.update = async (req, res) => {
  // Validate required fields
  const requiredFields = {
    series_id: "Series ID",
    indent_no: "Indent No",
    indent_date: "Indent Date",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields, {
    uniqueCheck: {
      model: Indent,
      fields: ["indent_no"],
      excludeId: req.params.id
    }
  });

  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  try {
    const updated = await commonQuery.updateRecordById(Indent, req.params.id, req.body);
    if (!updated || updated.status === 3) return res.error("NOT_FOUND");
    return res.success("UPDATE", MODULE, updated);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Delete Indent (soft delete)
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(Indent, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
