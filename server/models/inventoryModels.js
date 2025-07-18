// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const StockTransaction  = require("./inventory/stockTransaction")(sequelize, DataTypes);
const ReserveStock  = require("./inventory/reserveStock")(sequelize, DataTypes);
const StockGeneral  = require("./inventory/stockGeneral")(sequelize, DataTypes);
const StockGeneralTransaction  = require("./inventory/stockGeneralTransaction")(sequelize, DataTypes);
const BatchStockIn  = require("./inventory/batchStockIn")(sequelize, DataTypes);
const StockGeneralApprovalLog  = require("./inventory/stockGeneralApprovalLog")(sequelize, DataTypes);

// Add more as needed...

module.exports = {
  StockTransaction,
  ReserveStock,
  StockGeneral,
  StockGeneralTransaction,
  BatchStockIn,
  StockGeneralApprovalLog,
};
