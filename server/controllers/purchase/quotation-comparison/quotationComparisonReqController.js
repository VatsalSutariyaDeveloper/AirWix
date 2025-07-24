const { QuotationComparisonRequest, QuotationComparisonTrnReq } = require("../../../models");
const validateRequest = require("../../../helpers/validateRequest");
const commonQuery = require("../../../helpers/commonQuery");
const sequelize = require("../../../config/database");
const { updateSeries } = require("../../../helpers/functions/transaction_functions"); // Your series helper

const MODULE = "Quotation Comparison Request";

exports.create = async (req, res) => {
  const requiredFields = {
    req_quotation_no: "Req Quotation No",
    req_quotation_date: "Req Quotation Date",
    vendor_id: "Vendor",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  // Check if transaction data is present
  if (!Array.isArray(req.body.transactions) || req.body.transactions.length === 0) {
    return res.error("VALIDATION_ERROR", { errors: ["At least one Item is required."] });
  }

  const transaction = await sequelize.transaction();
  try {
    // 1. Create Header (QuotationComparisonRequest)
    const header = await commonQuery.createRecord(QuotationComparisonRequest, req.body, transaction);

    // 2. Create Transactions (QuotationComparisonTrnReq)
    for (const trn of req.body.transactions) {
      await commonQuery.createRecord(
        QuotationComparisonTrnReq,
        {
          ...trn,
          qc_request_id: header.id, // Link to parent
          user_id: req.body.user_id,
          branch_id: req.body.branch_id,
          company_id: req.body.company_id
        },
        transaction
      );
    }

    // 3. Update Series
      await updateSeries(req.body.series_id,transaction);

    await transaction.commit();
    return res.success("CREATE", MODULE, header);
  } catch (err) {
    await transaction.rollback();
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Get all Quotation Comparison Requests
exports.getAll = async (req, res) => {
  try {
    const result = await commonQuery.findAllRecords(QuotationComparisonRequest, { status: 0 });
    return res.success("FETCH", MODULE, result);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Get Quotation Comparison Request by ID
exports.getById = async (req, res) => {
  try {
    const record = await commonQuery.findOneById(QuotationComparisonRequest, req.params.id);
    if (!record || record.status === 2) return res.error("NOT_FOUND");
    return res.success("FETCH", MODULE, record);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};

// Update Quotation Comparison Request
exports.update = async (req, res) => {
  const requiredFields = {
    req_quotation_no: "Req Quotation No",
    req_quotation_date: "Req Quotation Date",
    vendor_id: "Vendor",
    user_id: "User",
    branch_id: "Branch",
    company_id: "Company"
  };

  const errors = await validateRequest(req.body, requiredFields);
  if (errors.length) return res.error("VALIDATION_ERROR", { errors });

  // Reject if no transactions or empty array
  if (!Array.isArray(req.body.transactions) || req.body.transactions.length === 0) {
    return res.error("VALIDATION_ERROR", { errors: ["At least one Item is required."] });
  }

  const transaction = await sequelize.transaction();
  try {
    // 1. Fetch existing header
    const existingHeader = await commonQuery.findOneById(
      QuotationComparisonRequest,
      req.params.id,
      false, // includeDeleted
      transaction
    );
    if (!existingHeader || existingHeader.status === 2) {
      throw new Error("Quotation Comparison Request not found or is deleted.");
    }

    // 2. Delete old transactions for this header
    await QuotationComparisonTrnReq.destroy({
      where: { qc_request_id: existingHeader.id },
      transaction
    });

    // 3. Update the header record
    await existingHeader.update(req.body, { transaction });

    // 4. Insert new transactions
    for (const trn of req.body.transactions) {
      await commonQuery.createRecord(
        QuotationComparisonTrnReq,
        {
          ...trn,
          qc_request_id: existingHeader.id,
          user_id: req.body.user_id,
          branch_id: req.body.branch_id,
          company_id: req.body.company_id
        },
        transaction
      );
    }

    // 5. Update series if series_id is provided
    if (req.body.series_id) {
      await updateSeries(req.body.series_id, transaction);
    }

    await transaction.commit();
    return res.success("UPDATE", MODULE, existingHeader);
  } catch (err) {
    await transaction.rollback();
    return res.error("SERVER_ERROR", { error: err.message });
  }
};


// Soft delete Quotation Comparison Request
exports.delete = async (req, res) => {
  try {
    const deleted = await commonQuery.softDeleteById(QuotationComparisonRequest, req.params.id);
    if (!deleted) return res.error("ALREADY_DELETED");
    return res.success("DELETE", MODULE);
  } catch (err) {
    return res.error("SERVER_ERROR", { error: err.message });
  }
};
