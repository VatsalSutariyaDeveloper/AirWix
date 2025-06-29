const express=require("express")
const router=express.Router()
const inquiryTypeController=require("../../../controllers/CRM/master/inquiryTypeController")




router.post("/",inquiryTypeController.create)
router.get("/",inquiryTypeController.getAll)
router.get("/:id",inquiryTypeController.getById)
router.put("/update/:id",inquiryTypeController.update)
router.put("/update/:id/status",inquiryTypeController.updateStatus)
router.delete("/:id",inquiryTypeController.delete)


module.exports = router;