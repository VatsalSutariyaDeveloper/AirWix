const express = require("express");
const router = express.Router();
const controller = require("../../controllers/mrp/soBranchPlaningController");

router.get("/", controller.getAll);
router.post("/", controller.assignBranch);

module.exports = router;