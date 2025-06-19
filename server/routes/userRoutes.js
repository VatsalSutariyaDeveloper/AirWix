const express = require("express");
const router = express.Router();
const { uploadImage } = require('../helpers/uploadImage');
const controller = require("../controllers/userController");



// Use memory storage to delay saving the image until after validation also add 2mb validation 2 means 2mb
router.post("/", uploadImage(2 * 1024 * 1024).single("authorized_signature"), controller.create);

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);

// Optional: Allow image re-upload during update also add 2mb validation 2 means 2mb
router.put('/:id', uploadImage(2 * 1024 * 1024).single('authorized_signature'), controller.updateUser);

// Hard delete route
router.patch('/hard-delete/:id', controller.hardDeleteUser);

// Soft delete route
router.delete('/:id', controller.softDeleteUser);

module.exports = router;
