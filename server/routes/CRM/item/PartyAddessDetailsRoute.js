const express=require("express")
const router=express.Router()
const partyAddressController=require("../../../controllers/CRM/master/partyAddressController")




router.post("/",partyAddressController.create)
router.get("/",partyAddressController.getAll)
router.get("/:id",partyAddressController.getById)
router.put("/update/:id",partyAddressController.update)
router.patch("/update/:id/status",partyAddressController.updateStatus)
router.delete("/:id",partyAddressController.delete)


module.exports = router;