const express=require("express")
const router=express.Router()
const inquiryTransactionController=require("../../../controllers/CRM/master/inquiryTransactionController")




router.post("/",inquiryTransactionController.create)
router.get("/",inquiryTransactionController.getAll)
router.get("/:id",inquiryTransactionController.getById)
router.put("/update/:id",inquiryTransactionController.update)
router.put("/update/:id/status",inquiryTransactionController.updateStatus)
router.delete("/:id",inquiryTransactionController.delete)


module.exports = router;