// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const SalesOrderProductAssignBomVersion  = require("./design-department/salesOrderProductAssignBomVersion")(sequelize, DataTypes);

// Add more as needed...
module.exports = {
  SalesOrderProductAssignBomVersion,
};
