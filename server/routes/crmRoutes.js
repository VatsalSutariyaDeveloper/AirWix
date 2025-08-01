const express = require("express");
const router = express.Router();

// All crm related routes
const inquiryTypeMasterRoutes = require("./crm/inquiry/inquiryTypeMasterRoutes");
const inquiryRoutes = require("./crm/inquiry/inquiryRoutes");
const inquiryTransactionRoutes = require("./crm/inquiry/inquiryTransactionRoutes");
const inquiryAttachmentRoutes = require("./crm/inquiry/inquiryAttachmentRoutes");
const inquiryNoteRoutes = require("./crm/inquiry/inquiryNoteRoutes");
const appointmentRoutes = require("./crm/inquiry/appointmentRoutes");
const followUpRoutes = require("./crm/inquiry/followUpRoutes");

const salesOrderRoutes = require("./crm/sales-order/salesOrderRoutes");
const salesOrderStockAllocateRoutes = require("./crm/sales-order/salesOrderStockAllocateRoutes");
const salesOrderTransactionRoutes = require("./crm/sales-order/salesOrderTransactionRoutes");
const salesOrderTermsTransactionRoutes = require("./crm/sales-order/salesOrderTermsTransactionRoutes");
const salesOrderAttachmentRoutes = require("./crm/sales-order/salesOrderAttachmentRoutes");
const salesOrderDeliveryDateRoutes = require("./crm/sales-order/salesOrderDeliveryDateRoutes");
const salesOrderApproveLogRoutes = require("./crm/sales-order/salesOrderApproveLogRoutes");
const orderAcceptanceApproveLogRoutes = require("./crm/sales-order/orderAcceptanceApproveLogRoutes");
const workOrderReservTempRoutes = require("./crm/sales-order/workOrderReservTempRoutes");
const salesOrderProductionTransactionRoutes = require("./crm/sales-order/salesOrderProductionTransactionRoutes");
const proformaInvoiceRoutes = require("./crm/sales-order/proformaInvoiceRoutes");

const quotationRoutes = require("./crm/quotation/quotationRoutes");
const quotationTransactionRoutes = require("./crm/quotation/quotationTransactionRoutes");
const quotationTermsTransactionRoutes = require("./crm/quotation/quotationTermsTransactionRoutes");
const quotationAttachmentRoutes = require("./crm/quotation/quotationAttachmentRoutes");
const quotationApproveLogRoutes = require("./crm/quotation/quotationApproveLogRoutes");

// Mount crm routes
router.use("/inquiry-type", inquiryTypeMasterRoutes);
router.use("/inquiry", inquiryRoutes);
router.use("/inquiry-transaction", inquiryTransactionRoutes);
router.use("/inquiry/attachment", inquiryAttachmentRoutes);
router.use("/inquiry/note", inquiryNoteRoutes);
router.use("/inquiry/appointment", appointmentRoutes);
router.use("/inquiry/followup", followUpRoutes);

router.use("/sales-order/transaction", salesOrderTransactionRoutes);
router.use("/sales-order/stock-allocate", salesOrderStockAllocateRoutes);
router.use("/sales-order/terms-transaction", salesOrderTermsTransactionRoutes);
router.use("/sales-order/attachment", salesOrderAttachmentRoutes);
router.use("/sales-order/delivery-date", salesOrderDeliveryDateRoutes);
router.use("/sales-order/approve-log", salesOrderApproveLogRoutes);
router.use("/sales-order/order-acceptance-approve-log", orderAcceptanceApproveLogRoutes);
router.use("/sales-order/work-order-reserv-temp", workOrderReservTempRoutes);
router.use("/sales-order/production-transaction", salesOrderProductionTransactionRoutes);
router.use("/proforma-invoice", proformaInvoiceRoutes);

router.use("/quotation/transaction", quotationTransactionRoutes);
router.use("/quotation/terms-transaction", quotationTermsTransactionRoutes);
router.use("/quotation/attachment", quotationAttachmentRoutes);
router.use("/quotation/approve-log", quotationApproveLogRoutes);

router.use("/quotation", quotationRoutes);

router.use("/sales-order", salesOrderRoutes);


module.exports = router;
