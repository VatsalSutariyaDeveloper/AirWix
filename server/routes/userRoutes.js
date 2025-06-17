const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const uploadImage = require('../helpers/uploadSignature'); // use memoryStorage version

// Use memory storage to delay saving the image until after validation
router.post('/', uploadImage.single('authorized_signature'), userController.create);
router.get('/', userController.getUsers);
router.get('/:id', userController.getUser);

// Optional: Allow image re-upload during update
router.put('/:id', uploadImage.single('authorized_signature'), userController.updateUser);
router.delete('/:id', userController.deleteUser);

module.exports = router;
