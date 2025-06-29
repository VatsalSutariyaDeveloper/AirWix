const express=require("express")
const router=express.Router()
const partyCategoryController=require("../../../controllers/CRM/master/partyCategoryController")




router.post("/",partyCategoryController.create)
router.get("/",partyCategoryController.getAll)
router.get("/:id",partyCategoryController.getById)
router.put("/update/:id",partyCategoryController.update)
router.patch("/partyCategory/:id/status",partyCategoryController.updateStatus)
router.delete("/:id",partyCategoryController.delete)


module.exports = router;