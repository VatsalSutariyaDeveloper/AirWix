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
// Add more as needed...

//Masters models
const BranchMaster = require("./masters/branchMaster")(sequelize, DataTypes);
const CityMaster = require("./masters/cityMaster")(sequelize, DataTypes);
const StateMaster = require("./masters/stateMaster")(sequelize, DataTypes);
const CountryMaster = require("./masters/countryMaster")(sequelize, DataTypes);
const ZoneMaster = require("./masters/zoneMaster")(sequelize, DataTypes);
const DrawingMaster = require("./masters/drawingMaster")(sequelize, DataTypes);
const DrawingTransaction = require("./masters/drawingTransaction")(sequelize, DataTypes);
const UserTypeMaster = require("./masters/userTypeMaster")(sequelize, DataTypes);

module.exports = {
  ProductCategory,
  ItemTaxTemplate,
  ItemTaxTemplateTransaction,
  HSNMaster,
  HSNMasterTransaction,
  ItemMasterFieldValue,
  ItemMasterFieldName,
  ProductUnitMaster,
  BranchMaster,
  CityMaster,
  StateMaster,
  CountryMaster,
  ZoneMaster,
  DrawingMaster,
  DrawingTransaction,
  UserTypeMaster,
  // Add more models here later
};
