const express=require("express")
const router=express.Router()
const partyMasterController=require("../../../controllers/CRM/master/PartyMasterController")




router.post("/",partyMasterController.create)
router.get("/",partyMasterController.getAll)
router.get("/:id",partyMasterController.getById)
router.put("/update/:id",partyMasterController.update)
router.patch("/partMaster/:id/status",partyMasterController.updateStatus)
router.delete("/:id",partyMasterController.delete)


module.exports = router;