// const express = require("express");
// const router = express.Router();

// // All item master related routes
// const productCategoryRoutes = require("./masters/item/productCategoryRoutes");
// const itemTaxTemplateRoutes = require("./masters/item/itemTaxTemplateRoutes");
// const itemTaxTemplateTransaction = require("./masters/item/itemTaxTemplateTransaction");
// const hsnMasterRoutes = require("./masters/item/hsnMasterRoutes");
// const hsnMasterTransaction = require("./masters/item/hsnMasterTransaction");
// const itemMasterFieldValue = require("./masters/item/itemMasterFieldValue");
// const itemMasterFieldName = require("./masters/item/itemMasterFieldName");
// const productUnitMasterRoutes = require("./masters/item/productUnitMasterRoutes");
// const itemMaster = require("./masters/item/itemMaster");

// //All Masters Routes
// const branchMasterRoutes = require("./masters/branchMasterRoutes");
// const cityMasterRoutes = require("./masters/cityMasterRoutes");
// const stateMasterRoutes = require("./masters/stateMasterRoutes");
// const countryMasterRoutes = require("./masters/countryMasterRoutes");
// const zoneMasterRoutes = require("./masters/zoneMasterRoutes");
// const drawingMasterRoutes = require("./masters/drawingMasterRoutes");
// const drawingTransactionRoutes = require("./masters/drawingTransactionRoutes");
// const userTypeMasterRoutes = require("./masters/userTypeMasterRoutes");
// const bankMasterRoutes = require("./masters/bankMasterRoutes");
// const companyMasterRoutes = require("./masters/companyMasterRoutes");
// const ledgerMasterRoutes = require("./masters/ledgerMasterRoutes");
// const ledgerDocumentMasterRoutes = require("./masters/ledgerDocumentMasterRoutes");
// const ledgerGroupMasterRoutes = require("./masters/ledgerGroupMasterRoutes");
// const businessTypeMasterRoutes = require("./masters/businessTypeMasterRoutes");
// const moduleMasterRoutes = require("./masters/moduleMasterRoutes");
// const seriesTypeMasterRoutes = require("./masters/seriesTypeMasterRoutes");
// const documentMasterRoutes = require("./masters/documentMasterRoutes");
// const commonCategoryMasterRoutes = require("./masters/commonCategoryMasterRoutes");
// const commonMasterRoutes = require("./masters/commonMasterRoutes");
// const currencyMasterRoutes = require("./masters/currencyMasterRoutes");
// const paymentTermsMasterRoutes = require("./masters/paymentTermsMasterRoutes");
// const transpotationMasterRoutes = require("./masters/transpotationMasterRoutes");
// const godownMasterRoutes = require("./masters/godownMasterRoutes");
// const processTypeMasterRoutes = require("./masters/processTypeMasterRoutes");
// const processListMasterRoutes = require("./masters/processListMasterRoutes");
// const productSpecificationMasterRoutes = require("./masters/productSpecificationMasterRoutes");
// const productSpecificationValueMasterRoutes = require("./masters/productSpecificationValueMasterRoutes");
// const qcParameterMasterRoutes = require("./masters/qcParameterMasterRoutes");
// const gstTypeMasterRoutes = require("./masters/gstTypeMasterRoutes");


// // Mount product category routes
// router.use("/category", productCategoryRoutes);
// router.use("/item-tax-template", itemTaxTemplateRoutes);
// router.use("/item-tax-template-transaction", itemTaxTemplateTransaction);
// router.use("/hsn-master", hsnMasterRoutes);
// router.use("/hsn-master-transaction", hsnMasterTransaction);
// router.use("/item-master-field-value", itemMasterFieldValue);
// router.use("/item-master-field-name", itemMasterFieldName);
// router.use("/product-unit-master", productUnitMasterRoutes);
// router.use("/item-master", itemMaster);


// //All Masters Routes
// router.use("/branch-master", branchMasterRoutes);
// router.use("/city-master", cityMasterRoutes);
// router.use("/state-master", stateMasterRoutes);
// router.use("/country-master", countryMasterRoutes);
// router.use("/zone-master", zoneMasterRoutes);
// router.use("/drawing-master", drawingMasterRoutes);
// router.use("/drawing-transaction", drawingTransactionRoutes);
// router.use("/user-type-master", userTypeMasterRoutes);
// router.use("/bank-master", bankMasterRoutes);
// router.use("/company-master", companyMasterRoutes);
// router.use("/ledger-master", ledgerMasterRoutes);
// router.use("/ledger-document-master", ledgerDocumentMasterRoutes);
// router.use("/ledger-group-master", ledgerGroupMasterRoutes);
// router.use("/business-type-master", businessTypeMasterRoutes);
// router.use("/module-master", moduleMasterRoutes);
// router.use("/series-type-master", seriesTypeMasterRoutes);
// router.use("/document-master", documentMasterRoutes);
// router.use("/common-category-master", commonCategoryMasterRoutes);
// router.use("/common-master", commonMasterRoutes);
// router.use("/currency-master", currencyMasterRoutes);
// router.use("/payment-terms-master", paymentTermsMasterRoutes);
// router.use("/transpotation-master", transpotationMasterRoutes);
// router.use("/godown-master", godownMasterRoutes);
// router.use("/process-type-master", processTypeMasterRoutes);
// router.use("/process-list-master", processListMasterRoutes);
// router.use("/product-specification-master", productSpecificationMasterRoutes);
// router.use("/product-specification-value-master", productSpecificationValueMasterRoutes);
// router.use("/qc-parameter-master", qcParameterMasterRoutes);
// router.use("/gst-type-master", gstTypeMasterRoutes);



// module.exports = router;
const express = require("express");
const router = express.Router();

// All item master related routes
// const productCategoryRoutes = require("./masters/item/productCategoryRoutes");
// const itemTaxTemplateRoutes = require("./masters/item/itemTaxTemplateRoutes");
// const itemTaxTemplateTransaction = require("./masters/item/itemTaxTemplateTransaction");
// const hsnMasterRoutes = require("./masters/item/hsnMasterRoutes");
// const hsnMasterTransaction = require("./masters/item/hsnMasterTransaction");
// const itemMasterFieldValue = require("./masters/item/itemMasterFieldValue");
// const itemMasterFieldName = require("./masters/item/itemMasterFieldName");
// const productUnitMasterRoutes = require("./masters/item/productUnitMasterRoutes");
// const itemMaster = require("./masters/item/itemMaster");

//All Masters Routes
const branchMasterRoutes = require("./masters/branchMasterRoutes");
const cityMasterRoutes = require("./masters/cityMasterRoutes");
const stateMasterRoutes = require("./masters/stateMasterRoutes");
const countryMasterRoutes = require("./masters/countryMasterRoutes");
const zoneMasterRoutes = require("./masters/zoneMasterRoutes");
const drawingMasterRoutes = require("./masters/drawingMasterRoutes");
const drawingTransactionRoutes = require("./masters/drawingTransactionRoutes");
const userTypeMasterRoutes = require("./masters/userTypeMasterRoutes");
const bankMasterRoutes = require("./masters/bankMasterRoutes");
const companyMasterRoutes = require("./masters/companyMasterRoutes");
const ledgerMasterRoutes = require("./masters/ledgerMasterRoutes");
const ledgerDocumentRoutes = require("./masters/ledgerDocumentRoutes");
const ledgerGroupRoutes = require("./masters/ledgerGroupRoutes");
const businessTypeMasterRoutes = require("./masters/businessTypeMasterRoutes");
const moduleMasterRoutes = require("./masters/moduleMasterRoutes");
const seriesTypeMasterRoutes = require("./masters/seriesTypeMasterRoutes");
const documentMasterRoutes = require("./masters/documentMasterRoutes");
const commonCategoryMasterRoutes = require("./masters/commonCategoryMasterRoutes");
const commonMasterRoutes = require("./masters/commonMasterRoutes");
const currencyMasterRoutes = require("./masters/currencyMasterRoutes");
const paymentTermsMasterRoutes = require("./masters/paymentTermsMasterRoutes");
const transpotationMasterRoutes = require("./masters/transpotationMasterRoutes");
const godownMasterRoutes = require("./masters/godownMasterRoutes");
const processTypeMasterRoutes = require("./masters/processTypeMasterRoutes");
const processListMasterRoutes = require("./masters/processListMasterRoutes");
const productSpecificationMasterRoutes = require("./masters/productSpecificationMasterRoutes");
const productSpecificationValueMasterRoutes = require("./masters/productSpecificationValueMasterRoutes");
const qcParameterMasterRoutes = require("./masters/qcParameterMasterRoutes");
const gstTypeMasterRoutes = require("./masters/gstTypeMasterRoutes");


// Mount product routes
// router.use("/category", productCategoryRoutes);
// router.use("/tax-template", itemTaxTemplateRoutes);
// router.use("/tax-template-transaction", itemTaxTemplateTransaction);
// router.use("/hsn", hsnMasterRoutes);
// router.use("/hsn-transaction", hsnMasterTransaction);
// router.use("/item-master-field-value", itemMasterFieldValue);
// router.use("/item-master-field-name", itemMasterFieldName);
// router.use("/product-unit", productUnitMasterRoutes);
// router.use("/item", itemMaster);


//All Masters Routes
router.use("/branch", branchMasterRoutes);
router.use("/city", cityMasterRoutes);
router.use("/state", stateMasterRoutes);
router.use("/country", countryMasterRoutes);
router.use("/zone", zoneMasterRoutes);
router.use("/drawing", drawingMasterRoutes);
router.use("/drawing-transaction", drawingTransactionRoutes);
router.use("/user-type", userTypeMasterRoutes);
router.use("/bank", bankMasterRoutes);
router.use("/company", companyMasterRoutes);
router.use("/ledger", ledgerMasterRoutes);
router.use("/ledger-document", ledgerDocumentRoutes);
router.use("/ledger-group", ledgerGroupRoutes);
router.use("/business-type", businessTypeMasterRoutes);
router.use("/module", moduleMasterRoutes);
router.use("/series-type", seriesTypeMasterRoutes);
router.use("/document", documentMasterRoutes);
router.use("/common-category", commonCategoryMasterRoutes);
router.use("/common", commonMasterRoutes);
router.use("/currency", currencyMasterRoutes);
router.use("/payment-terms", paymentTermsMasterRoutes);
router.use("/transpotation", transpotationMasterRoutes);
router.use("/godown", godownMasterRoutes);
router.use("/process-type", processTypeMasterRoutes);
router.use("/process-list", processListMasterRoutes);
router.use("/product-specification", productSpecificationMasterRoutes);
router.use("/product-specification-value", productSpecificationValueMasterRoutes);
router.use("/qc-parameter", qcParameterMasterRoutes);
router.use("/gst-type", gstTypeMasterRoutes);



module.exports = router;
