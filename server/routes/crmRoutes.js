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

// Mount crm routes
router.use("/inquiry-type", inquiryTypeMasterRoutes);
router.use("/inquiry", inquiryRoutes);
router.use("/inquiry-transaction", inquiryTransactionRoutes);
router.use("/inquiry/attachment", inquiryAttachmentRoutes);
router.use("/inquiry/note", inquiryNoteRoutes);
router.use("/inquiry/appointment", appointmentRoutes);
router.use("/inquiry/followup", followUpRoutes);

module.exports = router;
