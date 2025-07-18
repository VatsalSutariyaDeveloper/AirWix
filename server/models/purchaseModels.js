// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load Purchase models
const IndentApproval  = require("./purchase/indentApproval")(sequelize, DataTypes);
const PurchaseQuotation = require("./purchase/quotation")(sequelize, DataTypes);
const PurchaseQuotationRef = require("./purchase/quotationRef")(sequelize, DataTypes);
const QuotationTransactionRef = require("./purchase/quotationTransactionRef")(sequelize, DataTypes);
const SupplierQuotationDetails = require("./purchase/supplierQuotationDetails")(sequelize, DataTypes);

// Add more as needed...

module.exports = {
  IndentApproval,
  PurchaseQuotation,
  PurchaseQuotationRef,
  QuotationTransactionRef,
  SupplierQuotationDetails,
};
