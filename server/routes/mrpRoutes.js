const express = require("express");
const router = express.Router();

// All item master related routes
const soBranchPlaning = require("./mrp/soBranchPlanningRoutes");
// Mount product routes
router.use("/assign-branch", soBranchPlaning);

module.exports = router;
