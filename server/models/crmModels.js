// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const InquiryTypeMaster = require("./crm/inquiry/inquiryTypeMaster")(sequelize, DataTypes);
const Inquiry = require("./crm/inquiry/inquiry")(sequelize, DataTypes);
const InquiryTransaction = require("./crm/inquiry/inquiryTransaction")(sequelize, DataTypes);
const InquiryAttachment = require("./crm/inquiry/inquiryAttachment")(sequelize, DataTypes);
const InquiryNote = require("./crm/inquiry/inquiryNote")(sequelize, DataTypes);
const Appointment = require("./crm/inquiry/appointment")(sequelize, DataTypes);
const followUp = require("./crm/inquiry/followUp")(sequelize, DataTypes);

// Add more as needed...

module.exports = {
  InquiryTypeMaster,
  Inquiry,
  InquiryTransaction,
  InquiryAttachment,
  InquiryNote,
  Appointment,
  followUp,
};
