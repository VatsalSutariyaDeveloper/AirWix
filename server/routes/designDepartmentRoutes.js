const express = require("express");
const router = express.Router();

// All item master related routes
const allocateBomRoutes = require("./design-department/allocateBomRoutes");
// Mount product routes
router.use("/allocate-bom", allocateBomRoutes);

module.exports = router;
