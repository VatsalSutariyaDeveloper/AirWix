const multer = require('multer');
const path = require('path');

const uploadImage = multer({
  storage: multer.memoryStorage(), // Temporarily store file in memory
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (!['.png', '.jpg', '.jpeg'].includes(ext)) {
      return cb(new Error('Only images are allowed'));
    }
    cb(null, true);
  },
});

module.exports = uploadImage;
