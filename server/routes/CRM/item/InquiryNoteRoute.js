const express=require("express")
const router=express.Router()
const inquiryNoteController=require("../../../controllers/CRM/master/inquiryNoteController")




router.post("/",inquiryNoteController.create)
router.get("/",inquiryNoteController.getAll)
router.get("/:id",inquiryNoteController.getById)
router.put("/update/:id",inquiryNoteController.update)
router.put("/update/:id/status",inquiryNoteController.updateStatus)
router.delete("/:id",inquiryNoteController.delete)


module.exports = router;