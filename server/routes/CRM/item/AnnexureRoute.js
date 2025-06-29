const express=require("express")
const router=express.Router()
const annexureController=require("../../../controllers/CRM/master/annexureController")




router.post("/",annexureController.create)
router.get("/",annexureController.getAll)
router.get("/:id",annexureController.getById)
router.put("/update/:id",annexureController.update)
router.put("/update/:id/status",annexureController.updateStatus)
router.delete("/:id",annexureController.delete)


module.exports = router;