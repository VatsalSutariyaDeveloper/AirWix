const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Ensure upload directories exist
const ensureDir = (dirPath) => {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
};

// Generic file upload factory
const uploadFile = (type = "image", folder = "uploads/others/", maxSize = 2 * 1024 * 1024) => {
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = folder;
      ensureDir(uploadPath);
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
      cb(null, Date.now() + "_" + name + ext);
    }
  });

  let fileFilter;
  if (type === "image") {
    fileFilter = (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|webp/;
      const isValid = allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase());
      if (isValid) cb(null, true);
      else cb(new Error("Only JPG, JPEG, PNG, and WEBP files are allowed"));
    };
  } else if (type === "excel") {
    fileFilter = (req, file, cb) => {
      const allowedTypes = /vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel/;
      if (allowedTypes.test(file.mimetype)) cb(null, true);
      else cb(new Error("Only Excel files (.xls, .xlsx) are allowed"));
    };
  } else {
    fileFilter = (req, file, cb) => cb(null, true); // default allow all
  }

  return multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter
  });
};

module.exports = {
  uploadFile
};
