const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/purchase/quotation-comparison/supplierDetailsController");

router.post("/", controller.create);
// router.post('/upload-quotation', controller.uploadAndCreateSupplierDetails);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);

module.exports = router;
