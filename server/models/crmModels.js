// models/masters/index.js

const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Initialize all models
const InquiryTypeMaster = require("./crm/inquiry/inquiryTypeMaster")(sequelize, DataTypes);
const Inquiry = require("./crm/inquiry/inquiry")(sequelize, DataTypes);
const InquiryTransaction = require("./crm/inquiry/inquiryTransaction")(sequelize, DataTypes);
const InquiryAttachment = require("./crm/inquiry/inquiryAttachment")(sequelize, DataTypes);
const InquiryNote = require("./crm/inquiry/inquiryNote")(sequelize, DataTypes);
const Appointment = require("./crm/inquiry/appointment")(sequelize, DataTypes);
const followUp = require("./crm/inquiry/followUp")(sequelize, DataTypes);

const SalesOrder = require("./crm/sales-order/salesOrder")(sequelize, DataTypes);
const SalesOrderTransaction = require("./crm/sales-order/salesOrderTransaction")(sequelize, DataTypes);
const SalesOrderTermsTransaction = require("./crm/sales-order/salesOrderTermsTransaction")(sequelize, DataTypes);
const SalesOrderAttachment = require("./crm/sales-order/salesOrderAttachment")(sequelize, DataTypes);
const SalesOrderDeliveryDate = require("./crm/sales-order/salesOrderDeliveryDate")(sequelize, DataTypes);
const SalesOrderApproveLog = require("./crm/sales-order/salesOrderApproveLog")(sequelize, DataTypes);
const OrderAcceptanceApproveLog = require("./crm/sales-order/orderAcceptanceApproveLog")(sequelize, DataTypes);
const WorkOrderReservTemp = require("./crm/sales-order/workOrderReservTemp")(sequelize, DataTypes);
const SalesOrderProductionTransaction = require("./crm/sales-order/salesOrderProductionTransaction")(sequelize, DataTypes);
const ProformaInvoice = require("./crm/sales-order/proformaInvoice")(sequelize, DataTypes);

const Quotation = require("./crm/quotation/quotation")(sequelize, DataTypes);
const QuotationTransaction = require("./crm/quotation/quotationTransaction")(sequelize, DataTypes);
const QuotationTermsTransaction = require("./crm/quotation/quotationTermsTransaction")(sequelize, DataTypes);
const QuotationAttachment = require("./crm/quotation/quotationAttachment")(sequelize, DataTypes);
const QuotationApproveLog = require("./crm/quotation/quotationApproveLog")(sequelize, DataTypes);

// Collect all in db object
const db = {
  InquiryTypeMaster,
  Inquiry,
  InquiryTransaction,
  InquiryAttachment,
  InquiryNote,
  Appointment,
  followUp,
  SalesOrder,
  SalesOrderTransaction,
  SalesOrderTermsTransaction,
  SalesOrderAttachment,
  SalesOrderDeliveryDate,
  SalesOrderApproveLog,
  OrderAcceptanceApproveLog,
  WorkOrderReservTemp,
  SalesOrderProductionTransaction,
  ProformaInvoice,
  Quotation,
  QuotationTransaction,
  QuotationTermsTransaction,
  QuotationAttachment,
  QuotationApproveLog,
};

// Apply associations (IMPORTANT)
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // pass all models
  }
});

// Optional: Export Sequelize instance
db.sequelize = sequelize;
db.Sequelize = require("sequelize");

module.exports = db;