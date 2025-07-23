const express = require("express");
const router = express.Router();
const controller = require("../../controllers/inventory/stockGeneralController");

// This route handles: /api/stock-general/get-stock?product_id=1&godown_id=5
router.get("/get-stock", controller.getStock);
router.delete("/delete-deduct-stock/:stock_general_id", controller.deleteDeductStock);
router.delete("/delete-add-stock/:stock_general_id", controller.deleteAddStock);

// Other stock general routes
router.get("/", controller.getAll);
router.post("/", controller.create);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.post("/approval", controller.approveStockGeneral);
router.get("/:id", controller.getById); // Keep this last

module.exports = router;
