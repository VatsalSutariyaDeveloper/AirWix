const express=require("express")
const router=express.Router()
const quotationTransactionController=require("../../../controllers/CRM/master/quotationTransactionController")




router.post("/",quotationTransactionController.create)
router.get("/",quotationTransactionController.getAll)
router.get("/:id",quotationTransactionController.getById)
router.put("/update/:id",quotationTransactionController.update)
router.put("/update/:id/status",quotationTransactionController.updateStatus)
router.delete("/:id",quotationTransactionController.delete)


module.exports = router;