const express = require("express");
const router = express.Router();
const inquiryAttachmentController = require("../../../controllers/CRM/master/inquiryAttachmentController");
const upload = require("../../../middlewares/uploadFile");

router.post("/", upload.single("attachment_file"), inquiryAttachmentController.create);
router.get("/", inquiryAttachmentController.getAll);
router.get("/:id", inquiryAttachmentController.getById);
router.put("/update/:id", upload.single("attachment_file"), inquiryAttachmentController.update);
router.put("/update/:id/status", inquiryAttachmentController.updateStatus);
router.delete("/:id", inquiryAttachmentController.delete);

module.exports = router;
