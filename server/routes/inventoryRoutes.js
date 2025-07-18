const express = require("express");
const router = express.Router();

// All crm related routes
const stockRoutes = require("./inventory/stockRoutes");
const reserveStockRoutes = require("./inventory/reserveStockRoutes");
const stockGeneralRoutes = require("./inventory/stockGeneralRoutes");

// Mount crm routes
router.use("/stock", stockRoutes);
router.use("/reserve-stock", reserveStockRoutes);
router.use("/stock-general", stockGeneralRoutes);

module.exports = router;
