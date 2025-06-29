const express = require("express");
const router = express.Router();
const partyDocumentController = require("../../../controllers/CRM/master/partyDocumentController");
const upload = require("../../../middlewares/uploadFile");


router.post("/", upload.single("document_file"), partyDocumentController.create);
router.get("/", partyDocumentController.getAll);
router.get("/:id", partyDocumentController.getById);
router.put("/update/:id", upload.single("document_file"), partyDocumentController.update);

router.put("/update/:id/status", partyDocumentController.updateStatus);
router.delete("/:id", partyDocumentController.delete);

module.exports = router;
