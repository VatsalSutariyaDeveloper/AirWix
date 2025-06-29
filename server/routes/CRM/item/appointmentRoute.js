const express=require("express")
const router=express.Router()
const appointmentController=require("../../../controllers/CRM/master/appointmentController")




router.post("/",appointmentController.create)
router.get("/",appointmentController.getAll)
router.get("/:id",appointmentController.getById)
router.put("/update/:id",appointmentController.update)
router.put("/update/:id/status",appointmentController.updateStatus)
router.delete("/:id",appointmentController.delete)


module.exports = router;