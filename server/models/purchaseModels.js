// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load Purchase models
const IndentApproval  = require("./purchase/indentApproval")(sequelize, DataTypes);
const PurchaseQuotation = require("./purchase/quotation")(sequelize, DataTypes);
const PurchaseQuotationRef = require("./purchase/quotationRef")(sequelize, DataTypes);
const QuotationTransactionRef = require("./purchase/quotationTransactionRef")(sequelize, DataTypes);
const SupplierQuotationDetails = require("./purchase/supplierQuotationDetails")(sequelize, DataTypes);
const Indent = require("./purchase/indent")(sequelize, DataTypes);
const IndentTransaction = require("./purchase/indentTransaction")(sequelize, DataTypes);
const QuotationComparisonRequest = require("./purchase/quotation-comparison/request")(sequelize, DataTypes);
const QuotationComparisonTrnReq = require("./purchase/quotation-comparison/requestTransaction")(sequelize, DataTypes);
const QuotationComparison = require("./purchase/quotation-comparison/quotationComparison")(sequelize, DataTypes);
const QCSupplierDetails = require("./purchase/quotation-comparison/supplierDetails")(sequelize, DataTypes);

// Add more as needed...

module.exports = {
  IndentApproval,
  PurchaseQuotation,
  PurchaseQuotationRef,
  QuotationTransactionRef,
  SupplierQuotationDetails,
  Indent,
  IndentTransaction,
  QuotationComparisonRequest,
  QuotationComparisonTrnReq,
  QuotationComparison,
  QCSupplierDetails,
};
