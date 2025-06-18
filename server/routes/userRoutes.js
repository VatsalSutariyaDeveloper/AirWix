const express = require("express");
const router = express.Router();
const { uploadImage } = require('../helpers/uploadImage');
const controller = require("../controllers/userController");



// Use memory storage to delay saving the image until after validation
router.post("/", uploadImage().single("authorized_signature"), controller.create);

router.get('/', controller.getUsers);
router.get('/:id', controller.getUser);

// Optional: Allow image re-upload during update
router.put('/:id', uploadImage().single('authorized_signature'), controller.updateUser);
router.delete('/:id', controller.deleteUser);

module.exports = router;
