const multer = require("multer");
const path = require("path");
const fs = require("fs");

const uploadImage = (maxSize = 2 * 1024 * 1024) => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png/;
    const mimetypeValid = allowedTypes.test(file.mimetype);
    const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetypeValid && extValid) {
      cb(null, true);
    } else {
      cb(new Error("Only JPG, JPEG, and PNG image files are allowed"));
    }
  };

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });
};

module.exports = { uploadImage };

// // Ensure the folder exists
// const ensureDir = (dirPath) => {
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }
// };

// /**
//  * Upload images to a dynamic folder with validation
//  * @param {string} folder - dynamic folder path (e.g., "uploads/profile" or "uploads/signatures")
//  * @param {number} maxSize - file size limit in bytes
//  * @returns multer middleware
//  */
// const uploadImage = (folder = "uploads/signatures", maxSize = 2 * 1024 * 1024) => {
//   ensureDir(folder); // Create folder if not exists

//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       cb(null, folder);
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname).toLowerCase();
//       const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
//       const filename = `${Date.now()}_${name}${ext}`;
//       cb(null, filename);
//     }
//   });

//   const fileFilter = (req, file, cb) => {
//     const allowedTypes = /jpeg|jpg|png/;
//     const mimetypeValid = allowedTypes.test(file.mimetype);
//     const extValid = allowedTypes.test(path.extname(file.originalname).toLowerCase());

//     if (mimetypeValid && extValid) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPG, JPEG, and PNG image files are allowed"));
//     }
//   };

//   return multer({
//     storage,
//     limits: { fileSize: maxSize },
//     fileFilter,
//   });
// };

// module.exports = { uploadImage };
