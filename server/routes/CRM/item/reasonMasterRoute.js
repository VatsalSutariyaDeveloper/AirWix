const express=require("express")
const router=express.Router()
const reasonMasterController=require("../../../controllers/CRM/master/reasonMasterController")




router.post("/",reasonMasterController.create)
router.get("/",reasonMasterController.getAll)
router.get("/:id",reasonMasterController.getById)
router.put("/update/:id",reasonMasterController.update)
router.put("/update/:id/status",reasonMasterController.updateStatus)
router.delete("/:id",reasonMasterController.delete)


module.exports = router;