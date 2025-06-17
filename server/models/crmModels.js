// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const InquiryTypeMaster = require("./crm/inquiry/inquiryTypeMaster")(sequelize, DataTypes);

// Add more as needed...

//Masters models

module.exports = {
  InquiryTypeMaster,
};
