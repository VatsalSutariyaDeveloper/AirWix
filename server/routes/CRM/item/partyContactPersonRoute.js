const express=require("express")
const router=express.Router()
const partyContactPersonController=require("../../../controllers/CRM/master/partyContactPersonController")




router.post("/",partyContactPersonController.create)
router.get("/",partyContactPersonController.getAll)
router.get("/:id",partyContactPersonController.getById)
router.put("/update/:id",partyContactPersonController.update)
router.patch("/update/:id/status",partyContactPersonController.updateStatus)
router.delete("/:id",partyContactPersonController.delete)


module.exports = router;