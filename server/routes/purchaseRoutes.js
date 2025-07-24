const express = require("express");
const router = express.Router();

// All purchase routes
const indentApprovalRoutes = require("./purchase/indentApprovalRoutes");
const purchaseQuotationRoutes = require("./purchase/quotationRoutes");
const requestRoutes = require("./purchase/quotation-comparison/requestRoutes");
const quotationTransactionRefRoutes = require("./purchase/quotationTransactionRefRoutes");
const supplierQuotationDetailsRoutes = require("./purchase/quotation-comparison/supplierDetailsRoutes");

router.use("/indent-approval", indentApprovalRoutes);
router.use("/quotation", purchaseQuotationRoutes);
router.use("/quotation-comparison/request", requestRoutes);
router.use("/quotation-transaction-ref", quotationTransactionRefRoutes);
router.use("/quotation-comparison/supplier-details", supplierQuotationDetailsRoutes);



module.exports = router;
