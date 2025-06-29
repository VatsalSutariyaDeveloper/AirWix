const express=require("express")
const router=express.Router()
const PartyTermsConditionController=require("../../../controllers/CRM/master/PartyTermsConditionController")




router.post("/",PartyTermsConditionController.create)
router.get("/",PartyTermsConditionController.getAll)
router.get("/:id",PartyTermsConditionController.getById)
router.put("/update/:id",PartyTermsConditionController.update)
router.patch("/partyTerms/:id/status",PartyTermsConditionController.updateStatus)
router.delete("/:id",PartyTermsConditionController.delete)


module.exports = router;