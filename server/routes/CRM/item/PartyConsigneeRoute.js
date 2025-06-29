const express=require("express")
const router=express.Router()
const partyConsigneeController=require("../../../controllers/CRM/master/partyConsigneeController")




router.post("/",partyConsigneeController.create)
router.get("/",partyConsigneeController.getAll)
router.get("/:id",partyConsigneeController.getById)
router.put("/update/:id",partyConsigneeController.update)
router.patch("/update/:id/status",partyConsigneeController.updateStatus)
router.delete("/:id",partyConsigneeController.delete)


module.exports = router;