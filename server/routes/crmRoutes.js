const express = require("express");
const router = express.Router();

// All crm related routes
const inquiryTypeMasterRoutes = require("./crm/inquiry/inquiryTypeMasterRoutes");

// Mount crm routes
router.use("/inquiry-type", inquiryTypeMasterRoutes);

module.exports = router;
