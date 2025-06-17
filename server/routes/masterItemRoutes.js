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
const itemMaster = require("./masters/item/itemMaster");

// Mount product routes
router.use("/category", productCategoryRoutes);
router.use("/tax-template", itemTaxTemplateRoutes);
router.use("/tax-template-transaction", itemTaxTemplateTransaction);
router.use("/hsn", hsnMasterRoutes);
router.use("/hsn-transaction", hsnMasterTransaction);
router.use("/item-master-field-value", itemMasterFieldValue);
router.use("/item-master-field-name", itemMasterFieldName);
router.use("/product-unit", productUnitMasterRoutes);
router.use("/item-master", itemMaster);

module.exports = router;
