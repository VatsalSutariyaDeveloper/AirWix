const express=require("express")
const router=express.Router()
const quotationController=require("../../../controllers/CRM/master/quotationController")




router.post("/",quotationController.create)
router.get("/",quotationController.getAll)
router.get("/:id",quotationController.getById)
router.put("/update/:id",quotationController.update)
router.put("/update/:id/status",quotationController.updateStatus)
router.delete("/:id",quotationController.delete)


module.exports = router;