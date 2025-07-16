const express = require("express");
const router = express.Router();
const controller = require("../../controllers/design-department/allocateBomController");

router.get("/", controller.getAll);

module.exports = router;