const express = require("express");
const router = express.Router();
const partyTermsTransactionController = require("../../../controllers/CRM/master/partyTermsTransactionController");



router.post("/", partyTermsTransactionController.create);
router.get("/", partyTermsTransactionController.getAll);
router.get("/:id", partyTermsTransactionController.getById);
router.put("/update/:id",partyTermsTransactionController.update);

router.put("/update/:id/status", partyTermsTransactionController.updateStatus);
router.delete("/:id", partyTermsTransactionController.delete);

module.exports = router;
