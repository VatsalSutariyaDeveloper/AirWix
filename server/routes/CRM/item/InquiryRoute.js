const express=require("express")
const router=express.Router()
const inquiryController=require("../../../controllers/CRM/master/inquiryController")




router.post("/",inquiryController.create)
router.get("/",inquiryController.getAll)
router.get("/:id",inquiryController.getById)
router.put("/update/:id",inquiryController.update)
router.put("/update/:id/status",inquiryController.updateStatus)
router.delete("/:id",inquiryController.delete)


module.exports = router;