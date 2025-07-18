const express = require("express");
const router = express.Router();
const controller = require("../../controllers/design-department/allocateBomController");

router.get("/", controller.getAll);
router.post("/assign-standard-bom", controller.assignStandardBom);
router.post("/assign-bom", controller.assignBom);

module.exports = router;