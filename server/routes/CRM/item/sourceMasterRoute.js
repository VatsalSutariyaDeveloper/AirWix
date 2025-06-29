const express=require("express")
const router=express.Router()
const sourceMasterController=require("../../../controllers/CRM/master/sourceMasterController")




router.post("/",sourceMasterController.create)
router.get("/",sourceMasterController.getAll)
router.get("/:id",sourceMasterController.getById)
router.put("/update/:id",sourceMasterController.update)
router.put("/update/:id/status",sourceMasterController.updateStatus)
router.delete("/:id",sourceMasterController.delete)


module.exports = router;