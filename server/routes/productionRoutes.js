const express = require("express");
const router = express.Router();

// All routes
const productBomVersionRoutes = require("./production/bom/productBomVersionRoutes");
const bomRoutes = require("./production/bom/bomRoutes");
const bomTransactionRoutes = require("./production/bom/bomTransactionRoutes");
const bomProductProcessRoutes = require("./production/bom/bomProductProcessRoutes");


router.use("/bom/product-bom-version", productBomVersionRoutes);
router.use("/bom/transaction", bomTransactionRoutes);
router.use("/bom/product-process", bomProductProcessRoutes);

router.use("/bom", bomRoutes);




module.exports = router;
