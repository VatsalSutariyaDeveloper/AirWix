const express = require("express");
const router = express.Router();
const controller = require("../../controllers/inventory/reserveStockController");

// ✅ Route to fetch reserve stock (custom logic)
router.get("/get-reserve-stock", controller.getReserveStock);

// ✅ Standard CRUD routes
router.get("/", controller.getAll);
router.post("/", controller.create);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete); // soft delete by ID

module.exports = router;
