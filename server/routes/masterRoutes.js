const express = require("express");
const router = express.Router();

// All item master related routes
const productCategoryRoutes = require("./masters/item/productCategoryRoutes");
const itemTaxTemplateRoutes = require("./masters/item/itemTaxTemplateRoutes");
const itemTaxTemplateTransaction = require("./masters/item/itemTaxTemplateTransaction");
const hsnMasterRoutes = require("./masters/item/hsnMasterRoutes");
const hsnMasterTransaction = require("./masters/item/hsnMasterTransaction");
const itemMasterFieldValue = require("./masters/item/itemMasterFieldValue");
const itemMasterFieldName = require("./masters/item/itemMasterFieldName");
const productUnitMasterRoutes = require("./masters/item/productUnitMasterRoutes");

//All Masters Routes
const branchMasterRoutes = require("./masters/branchMasterRoutes");
const cityMasterRoutes = require("./masters/cityMasterRoutes");
const stateMasterRoutes = require("./masters/stateMasterRoutes");
const countryMasterRoutes = require("./masters/countryMasterRoutes");
const zoneMasterRoutes = require("./masters/zoneMasterRoutes");
const drawingMasterRoutes = require("./masters/drawingMasterRoutes");
const drawingTransactionRoutes = require("./masters/drawingTransactionRoutes");
const userTypeMasterRoutes = require("./masters/userTypeMasterRoutes");

// Mount product category routes
router.use("/product-category", productCategoryRoutes);
router.use("/item-tax-template", itemTaxTemplateRoutes);
router.use("/item-tax-template-transaction", itemTaxTemplateTransaction);
router.use("/hsn-master", hsnMasterRoutes);
router.use("/hsn-master-transaction", hsnMasterTransaction);
router.use("/item-master-field-value", itemMasterFieldValue);
router.use("/item-master-field-name", itemMasterFieldName);
router.use("/product-unit-master", productUnitMasterRoutes);


//All Masters Routes
router.use("/branch-master", branchMasterRoutes);
router.use("/city-master", cityMasterRoutes);
router.use("/state-master", stateMasterRoutes);
router.use("/country-master", countryMasterRoutes);
router.use("/zone-master", zoneMasterRoutes);
router.use("/drawing-master", drawingMasterRoutes);
router.use("/drawing-transaction", drawingTransactionRoutes);
router.use("/user-type-master", userTypeMasterRoutes);

module.exports = router;
