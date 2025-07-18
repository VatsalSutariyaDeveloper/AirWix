const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load transaction models
const BillSundryTransaction  = require("./transactions/billSundryTransaction")(sequelize, DataTypes);
const TaxTransaction  = require("./transactions/taxTransaction")(sequelize, DataTypes);

// Add more as needed...

module.exports = {
  BillSundryTransaction,
  TaxTransaction,
};
