const router = require("express").Router();
const controller = require("../../../controllers/crm/sales-order/salesOrderStockAllocateController");

router.post("/", controller.create);
router.get("/", controller.getAll);

module.exports = router;
