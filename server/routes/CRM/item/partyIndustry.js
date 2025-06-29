const express=require("express")
const router=express.Router()
const partyIndustryController=require("../../../controllers/CRM/master/PartyIndustryController")




router.post("/",partyIndustryController.create)
router.get("/",partyIndustryController.getAll)
router.get("/:id",partyIndustryController.getById)
router.put("/update/:id",partyIndustryController.update)
router.patch("/industry/:id/status",partyIndustryController.updateStatus)
router.delete("/:id",partyIndustryController.delete)


module.exports = router;