// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const StockTransaction = require("./inventory/stockTransaction")(
  sequelize,
  DataTypes
);
const ReserveStock = require("./inventory/reserveStock")(sequelize, DataTypes);
const StockGeneral = require("./inventory/stockGeneral")(sequelize, DataTypes);
const StockGeneralTransaction = require("./inventory/stockGeneralTransaction")(
  sequelize,
  DataTypes
);
const BatchStockIn = require("./inventory/batchStockIn")(sequelize, DataTypes);
const StockGeneralApprovalLog = require("./inventory/stockGeneralApprovalLog")(
  sequelize,
  DataTypes
);

// Add more as needed...

const db = {
  StockTransaction,
  ReserveStock,
  StockGeneral,
  StockGeneralTransaction,
  BatchStockIn,
  StockGeneralApprovalLog,
};

// Apply associations (IMPORTANT)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // pass all models
  }
});

// Optional: Export Sequelize instance
db.sequelize = sequelize;
db.Sequelize = require("sequelize");

module.exports = db;
