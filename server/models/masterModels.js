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










const MasterCategory = require("./CRM/masterCategory")(sequelize, DataTypes);
const PartyIndustry = require("./CRM/partyIndustry")(sequelize, DataTypes);
const TerritoryMaster=require("./CRM/TerritoryMaster")(sequelize,DataTypes)
const TermsCategory=require("./CRM/TermsCategory")(sequelize,DataTypes)
const PartyTermsCondition=require("./CRM/partyTermsCondition")(sequelize,DataTypes)
const PartyCategory=require("./CRM/PartyCategory")(sequelize,DataTypes)
const PartyMaster=require("./CRM/PartyMaster")(sequelize,DataTypes)
const PartyAddess=require("./CRM/PartyAddress")(sequelize,DataTypes)
const PartyContactPerson=require("./CRM/PartyContactPersonModel")(sequelize,DataTypes)
const PartyConsignee=require("./CRM/PartyConsignee")(sequelize,DataTypes)
const PartyDocument=require("./CRM/PartyDocument")(sequelize,DataTypes)
const PartyTermsTransaction=require("./CRM/PartyTermsTransaction")(sequelize,DataTypes)
const Annexure=require("./CRM/Annexure")(sequelize,DataTypes)
const SourceMaster=require("./CRM/SourceMaster")(sequelize,DataTypes)
const ReasonMaster=require("./CRM/ReasonMaster")(sequelize,DataTypes)
const GeneralTask=require("./CRM/GeneralTask")(sequelize,DataTypes)
const InquiryType=require("./CRM/InquiryType")(sequelize,DataTypes)
const Inquiry=require("./CRM/Inquiry")(sequelize,DataTypes)
const InquiryTransaction=require("./CRM/InquiryTransaction")(sequelize,DataTypes)
const InquiryAttachment=require("./CRM/InquiryAttachment")(sequelize,DataTypes)
const InquiryNote=require("./CRM/InquiryNote")(sequelize,DataTypes)
const Appointment=require("./CRM/appointment")(sequelize,DataTypes)
const FollowUp=require("./CRM/followup")(sequelize,DataTypes)
const Quotation=require("./CRM/quotation")(sequelize,DataTypes)
const QuotationTransaction=require("./CRM/quotation_transaction")(sequelize,DataTypes)

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
  MasterCategory,
  PartyIndustry,
  TerritoryMaster,
  TermsCategory,
  PartyTermsCondition,
  PartyCategory,
  PartyMaster,
  PartyAddess,
  PartyContactPerson,
  PartyConsignee,
  PartyDocument,
  PartyTermsTransaction,
  Annexure,
  SourceMaster,
  ReasonMaster,
  GeneralTask,
  InquiryType,
  Inquiry,
  InquiryTransaction,
  InquiryAttachment,
  InquiryNote,
  Appointment,
  FollowUp,
  Quotation,
  QuotationTransaction

  // Add more models here later
};
