const express = require("express");
const router = express.Router();

const crmCategory = require("./item/crmRoute");        // For categories
const partyIndustry = require("./item/partyIndustry"); // For industry
const TerritoryMaster = require("./item/TerritoryMasterRoute"); // For territory
const TermsCategory = require("./item/TermsCategoryRoute"); // For termsCategory
const PartyTermsCondition=require("./item/partyTermsConditionRoute")
const partyCategory=require("./item/partyCategoryRoute")
const partyMasterRoute=require("./item/partyMasterRoute")
const PartyAddessDetailsRoute=require("./item/PartyAddessDetailsRoute")
const partyContactPersonRoute=require("./item/partyContactPersonRoute")
const PartyConsigneeRoute=require("./item/PartyConsigneeRoute")
const partyDocumentRoute=require("./item/partyDocumentRoute")
const partyTermsTrnsactionRoute=require("./item/partyTermsTrnsactionRoute")
const AnnexureRoute=require("./item/AnnexureRoute")
const sourceMasterRoute=require("./item/sourceMasterRoute")
const reasonMasterRoute=require("./item/reasonMasterRoute")
const generalTaskRoute=require("./item/generalTaskRoute")
const inquiryTypeRoute=require("./item/inquiryTypeRoute")
const InquiryRoute=require("./item/InquiryRoute")
const inquiryTransactionRoute=require("./item/inquiryTransactionRoute")
const inquiryAttachmentRoute=require("./item/inquiryAttachmentRoute")
const InquiryNoteRoute=require("./item/InquiryNoteRoute")
const appointmentRoute=require("./item/appointmentRoute")
const followupRoute=require("./item/followupRoute")
const quotationRoute=require("./item/quotationRoute")
const quotationTransactionRoute=require("./item/quotationTransactionRoute")

// Use separate route paths to avoid conflict
router.use("/crm-category", crmCategory);        // → /crm/item/crm-category/...
router.use("/party-industry", partyIndustry);    // → /crm/item/party-industry/...
router.use("/territory-master", TerritoryMaster);  
router.use("/terms-category", TermsCategory);  
router.use("/partyTerms-condition", PartyTermsCondition);  
router.use("/party-category", partyCategory);  
router.use("/party-master", partyMasterRoute);  
router.use("/party-address", PartyAddessDetailsRoute);  
router.use("/party-contact-person", partyContactPersonRoute);  
router.use("/party-consignee", PartyConsigneeRoute);  
router.use("/party-document", partyDocumentRoute);  
router.use("/party-terms-transaction", partyTermsTrnsactionRoute);  
router.use("/annexure", AnnexureRoute);  
router.use("/source-master", sourceMasterRoute);  
router.use("/reason-master", reasonMasterRoute);  
router.use("/general-task", generalTaskRoute);  
router.use("/inquiry-type", inquiryTypeRoute);  
router.use("/inquiry", InquiryRoute);  
router.use("/inquiry-transaction", inquiryTransactionRoute);  
router.use("/inquiry-attachment", inquiryAttachmentRoute);  
router.use("/inquiry-note", InquiryNoteRoute);  
router.use("/appointment", appointmentRoute);  
router.use("/follow-up", followupRoute);  
router.use("/quotation", quotationRoute);  
router.use("/quotation-transaction", quotationTransactionRoute);  
module.exports = router;
