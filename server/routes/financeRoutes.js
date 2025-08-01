const express = require("express");
const router = express.Router();

// All item master related routes
const invoiceRoutes = require("./finance/invoiceRoutes");
// Mount product routes
router.use("/invoice", invoiceRoutes);

module.exports = router;
