const express=require("express")
const router=express.Router()
const followUpController=require("../../../controllers/CRM/master/followUpController")




router.post("/",followUpController.create)
router.get("/",followUpController.getAll)
router.get("/:id",followUpController.getById)
router.put("/update/:id",followUpController.update)
router.put("/update/:id/status",followUpController.updateStatus)
router.delete("/:id",followUpController.delete)


module.exports = router;