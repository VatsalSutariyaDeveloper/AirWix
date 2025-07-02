// models/masters/index.js
const sequelize = require("../config/database");
const { DataTypes } = require("sequelize");

// Load item models under masters
const MenuMaster = require("./administration/menuMaster")(sequelize, DataTypes);
const MenuMasterAccess = require("./administration/menuMasterAccess")(sequelize, DataTypes);
const MenuMasterAccessRoute = require("./administration/menuMasterAccessRoute")(sequelize, DataTypes);
const TemplateAccessPermission = require("./administration/templateAccessPermission")(sequelize, DataTypes);
const Permission = require("./administration/permission")(sequelize, DataTypes);
const PrintTypeMaster = require("./administration/printTypeMaster")(sequelize, DataTypes);
const PrintMaster = require("./administration/printMaster")(sequelize, DataTypes);
const PrintPermission = require("./administration/printPermission")(sequelize, DataTypes);


module.exports = {
  MenuMaster,
  MenuMasterAccess,
  MenuMasterAccessRoute,
  TemplateAccessPermission,
  Permission,
  PrintTypeMaster,
  PrintMaster,
  PrintPermission,
};
