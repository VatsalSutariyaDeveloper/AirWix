const express=require("express")
const router=express.Router()
const generalTaskController=require("../../../controllers/CRM/master/generalTaskController")




router.post("/",generalTaskController.create)
router.get("/",generalTaskController.getAll)
router.get("/:id",generalTaskController.getById)
router.put("/update/:id",generalTaskController.update)
router.put("/update/:id/status",generalTaskController.updateStatus)
router.delete("/:id",generalTaskController.delete)


module.exports = router;