const { BillSundryTransaction,TaxTransaction } = require("../../models");
const validateRequest = require("../validateRequest");
const commonQuery = require("../commonQuery");
const { SeriesTypeMaster } = require("../../models");

// Create Bill Sundries
exports.createBillSundries = async ({ sundries, module_transaction_id, transaction }) => {
  for (const [i, sundry] of sundries.entries()) {
    const fullSundry = {
      ...sundry,
      module_transaction_id,
    };

    // Required fields for each bill sundry
    const requiredFields = {
      module_id: "Module ID",
      module_transaction_id: "Module Transaction ID",
      sundry_amount: "Sundry Amount",
    };

    // Validate the fields
    const errors = await validateRequest(fullSundry, requiredFields);
    if (errors.length) {
      throw new Error(`Bill Sundry ${i + 1}: ${errors.join(", ")}`);
    }

    // Use common function to create the record
    await commonQuery.createRecord(BillSundryTransaction, fullSundry, transaction);
  }
};

exports.createTaxTransactions = async ({ taxes, module_transaction_id, transaction }) => {
  for (const [i, tax] of taxes.entries()) {
    const fullTax = {
      ...tax,
      module_transaction_id,
    };

    // Required fields
    const requiredFields = {
      tax_id: "Tax ID",
      module_id: "Module ID",
      module_transaction_id: "Module Transaction ID",
      tax_value: "Tax Value",
      user_id: "User",
      branch_id: "Branch",
      company_id: "Company",
    };

    const errors = await validateRequest(fullTax, requiredFields);
    if (errors.length) {
      throw new Error(`Tax Transaction ${i + 1}: ${errors.join(", ")}`);
    }

    // Use common query
    await commonQuery.createRecord(TaxTransaction, fullTax, transaction);
  }
};

exports.updateSeries = async (seriesInput, transaction) => {
  const series_id = typeof seriesInput === 'object' ? seriesInput.series_id : seriesInput;

  const series = await SeriesTypeMaster.findOne({
    where: {
      id: series_id
    },
    transaction
  });

  if (!series) throw new Error("Series not found");

  const current = parseInt(series.start_series || 0, 10);
  const newStart = (current + 1).toString().padStart(series.start_series.length, 0);

  await SeriesTypeMaster.update(
    { start_series: newStart },
    {
      where: { id: series_id },
      transaction
    }
  );

  return newStart;
};