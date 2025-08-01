const express = require("express");
const router = express.Router();
const controller = require("../../controllers/finance/invoiceController");

router.get("/pending-so-invoice", controller.getPendingSalesOrderInvoice);
router.post("/", controller.create);

module.exports = router;