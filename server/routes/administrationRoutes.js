const express = require("express");
const router = express.Router();

// All routes
const menuMasterRoutes = require("./administration/menuMasterRoutes");
const menuMasterAccessRoutes = require("./administration/menuMasterAccessRoutes");
const menuMasterAccessRouteRoutes = require("./administration/menuMasterAccessRouteRoutes");
const templateAccessPermissionRoutes = require("./administration/templateAccessPermissionRoutes");
const permissionRoutes = require("./administration/permissionRoutes");
const printTypeMasterRoutes = require("./administration/printTypeMasterRoutes");
const printMasterRoutes = require("./administration/printMasterRoutes");
const printPermissionRoutes = require("./administration/printPermissionRoutes");

//Masters

// Mount crm routes
router.use("/menu-master", menuMasterRoutes);
router.use("/menu-master-access", menuMasterAccessRoutes);
router.use("/menu-master-access-route", menuMasterAccessRouteRoutes);
router.use("/template-access-permission", templateAccessPermissionRoutes);
router.use("/permission", permissionRoutes);
router.use("/print-type-master", printTypeMasterRoutes);
router.use("/print-master", printMasterRoutes);
router.use("/print-permission", printPermissionRoutes);




module.exports = router;
