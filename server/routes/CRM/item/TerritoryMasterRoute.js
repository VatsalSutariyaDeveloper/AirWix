const express=require("express")
const router=express.Router()
const TerritoryMasterController=require("../../../controllers/CRM/master/TerritoryMasterController")




router.post("/",TerritoryMasterController.create)
router.get("/",TerritoryMasterController.getAll)
router.get("/:id",TerritoryMasterController.getById)
router.put("/update/:id",TerritoryMasterController.update)
router.patch("/territory/:id/status",TerritoryMasterController.updateStatus)
router.delete("/:id",TerritoryMasterController.delete)


module.exports = router;