// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load models
const ProductBomVersion = require("./production/bom/productBomVersion")(sequelize, DataTypes);
const BOM = require("./production/bom/bom")(sequelize, DataTypes);
const BOMTransaction = require("./production/bom/bomTransaction")(sequelize, DataTypes);
const BOMProductProcess = require("./production/bom/bomProductProcess")(sequelize, DataTypes);


// Add more as needed...

module.exports = {
  ProductBomVersion,
  BOM,
  BOMTransaction,
  BOMProductProcess,
};
