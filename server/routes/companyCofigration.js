const express = require('express');
const router = express.Router();
const companyConfigrationController = require('../controllers/companyConfigrationController');
const uploadImage = require('../helpers/uploadSignature'); // use memoryStorage version

// Use memory storage to delay saving the image until after validation
router.post('/', uploadImage.single('authorized_signature'), companyConfigrationController.create);
router.get('/', companyConfigrationController.getUsers);
router.get('/:id', companyConfigrationController.getUser);

// Optional: Allow image re-upload during update
router.put('/:id', uploadImage.single('authorized_signature'), companyConfigrationController.updateUser);
router.delete('/:id', companyConfigrationController.deleteUser);

module.exports = router;
