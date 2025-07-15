const express = require("express");
const router = express.Router();

// All purchase routes
const indentApprovalRoutes = require("./purchase/indentApprovalRoutes");
const purchaseQuotationRoutes = require("./purchase/quotationRoutes");
const purchaseQuotationRefRoutes = require("./purchase/quotationRefRoutes");
const quotationTransactionRefRoutes = require("./purchase/quotationTransactionRefRoutes");
const supplierQuotationDetailsRoutes = require("./purchase/supplierQuotationDetailsRoutes");

router.use("/indent-approval", indentApprovalRoutes);
router.use("/quotation", purchaseQuotationRoutes);
router.use("/quotation-ref", purchaseQuotationRefRoutes);
router.use("/quotation-transaction-ref", quotationTransactionRefRoutes);
router.use("/supplier-quotation-details", supplierQuotationDetailsRoutes);



module.exports = router;
