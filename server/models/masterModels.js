// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const ProductCategory = require("./masters/item/productCategory")(sequelize, DataTypes);
const ItemTaxTemplate = require("./masters/item/itemTaxTemplate")(sequelize, DataTypes);
const ItemTaxTemplateTransaction = require("./masters/item/itemTaxTemplateTransaction")(sequelize, DataTypes);
const HSNMaster = require("./masters/item/hsnMaster")(sequelize, DataTypes);
const HSNMasterTransaction = require("./masters/item/HSNMasterTransaction")(sequelize, DataTypes);
const ItemMasterFieldValue = require("./masters/item/itemMasterFieldValue")(sequelize, DataTypes);
const ItemMasterFieldName = require("./masters/item/itemMasterFieldName")(sequelize, DataTypes);
const ProductUnitMaster = require("./masters/item/productUnitMaster")(sequelize, DataTypes);
const ItemMaster = require("./masters/item/itemMaster")(sequelize, DataTypes);

// Add more as needed...

//Masters models
const BranchMaster = require("./masters/branchMaster")(sequelize, DataTypes);
const BankMaster = require("./masters/bankMaster")(sequelize, DataTypes);
const CompanyMaster = require("./masters/companyMaster")(sequelize, DataTypes);
const CityMaster = require("./masters/cityMaster")(sequelize, DataTypes);
const StateMaster = require("./masters/stateMaster")(sequelize, DataTypes);
const CountryMaster = require("./masters/countryMaster")(sequelize, DataTypes);
const ZoneMaster = require("./masters/zoneMaster")(sequelize, DataTypes);
const DrawingMaster = require("./masters/drawingMaster")(sequelize, DataTypes);
const DrawingTransaction = require("./masters/drawingTransaction")(sequelize, DataTypes);
const UserTypeMaster = require("./masters/userTypeMaster")(sequelize, DataTypes);
const LedgerMaster = require("./masters/ledgerMaster")(sequelize, DataTypes);
const LedgerDocument = require("./masters/ledgerDocument")(sequelize, DataTypes);
const LedgerGroup = require("./masters/ledgerGroup")(sequelize, DataTypes);
const BusinessTypeMaster = require("./masters/businessTypeMaster")(sequelize, DataTypes);
const ModuleMaster = require("./masters/moduleMaster")(sequelize, DataTypes);
const SeriesTypeMaster = require("./masters/seriesTypeMaster")(sequelize, DataTypes);
const DocumentMaster = require("./masters/documentMaster")(sequelize, DataTypes);
const CommonCategoryMaster = require("./masters/commonCategoryMaster")(sequelize, DataTypes);
const CommonMaster = require("./masters/commonMaster")(sequelize, DataTypes);
const CurrencyMaster = require("./masters/currencyMaster")(sequelize, DataTypes);
const PaymentTermsMaster = require("./masters/paymentTermsMaster")(sequelize, DataTypes);
const TranspotationMaster = require("./masters/transpotationMaster")(sequelize, DataTypes);
const GodownMaster = require("./masters/godownMaster")(sequelize, DataTypes);
const ProcessTypeMaster = require("./masters/processTypeMaster")(sequelize, DataTypes);
const ProcessListMaster = require("./masters/processListMaster")(sequelize, DataTypes);
const ProductSpecificationMaster = require("./masters/productSpecificationMaster")(sequelize, DataTypes);
const ProductSpecificationValueMaster = require("./masters/productSpecificationValueMaster")(sequelize, DataTypes);
const QcParameterMaster = require("./masters/qcParameterMaster")(sequelize, DataTypes);
const GstTypeMaster = require("./masters/gstTypeMaster")(sequelize, DataTypes);

module.exports = {
  ProductCategory,
  ItemTaxTemplate,
  ItemTaxTemplateTransaction,
  HSNMaster,
  HSNMasterTransaction,
  ItemMasterFieldValue,
  ItemMasterFieldName,
  ProductUnitMaster,
  ItemMaster,
  BranchMaster,
  BankMaster,
  CompanyMaster,
  CityMaster,
  StateMaster,
  CountryMaster,
  ZoneMaster,
  DrawingMaster,
  DrawingTransaction,
  UserTypeMaster,
  LedgerMaster,
  LedgerDocument,
  LedgerGroup,
  BusinessTypeMaster,
  ModuleMaster,
  SeriesTypeMaster,
  DocumentMaster,
  CommonCategoryMaster,
  CommonMaster,
  CurrencyMaster,
  PaymentTermsMaster,
  TranspotationMaster,
  GodownMaster,
  ProcessTypeMaster,
  ProcessListMaster,
  ProductSpecificationMaster,
  ProductSpecificationValueMaster,
  QcParameterMaster,
  GstTypeMaster,
};
