const express=require("express")
const router=express.Router()
const TermsCategoryController=require("../../../controllers/CRM/master/TermsCategoryController")




router.post("/",TermsCategoryController.create)
router.get("/",TermsCategoryController.getAll)
router.get("/:id",TermsCategoryController.getById)
router.put("/update/:id",TermsCategoryController.update)
router.patch("/termscategory/:id/status",TermsCategoryController.updateStatus)
router.delete("/:id",TermsCategoryController.delete)


module.exports = router;