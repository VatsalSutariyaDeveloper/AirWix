const express = require("express");
const router = express.Router();
const controller = require("../../../controllers/CRM/master/masterCategory");

// Route: Create a new category
router.post("/", controller.create);
router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.put("/:id", controller.update);
router.delete("/:id", controller.delete);
router.patch("/update-status/:id", controller.updateStatus);

module.exports = router;
