// const multer = require("multer");
// const path = require("path");
// const fs = require("fs");

// // Ensure upload directories exist
// const ensureDir = (dirPath) => {
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }
// };

// // Generic file upload factory
// const uploadFile = (type = "image", folder = "uploads/others/", maxSize = 2 * 1024 * 1024) => {
//   const storage = multer.diskStorage({
//     destination: (req, file, cb) => {
//       const uploadPath = folder;
//       ensureDir(uploadPath);
//       cb(null, uploadPath);
//     },
//     filename: (req, file, cb) => {
//       const ext = path.extname(file.originalname).toLowerCase();
//       const name = path.basename(file.originalname, ext).replace(/\s+/g, "_");
//       cb(null, Date.now() + "_" + name + ext);
//     }
//   });

//   let fileFilter;
//   if (type === "image") {
//     fileFilter = (req, file, cb) => {
//       const allowedTypes = /jpeg|jpg|webp/;
//       const isValid = allowedTypes.test(file.mimetype) && allowedTypes.test(path.extname(file.originalname).toLowerCase());
//       if (isValid) cb(null, true);
//       else cb(new Error("Only JPG, JPEG, PNG, and WEBP files are allowed"));
//     };
//   } else if (type === "excel") {
//     fileFilter = (req, file, cb) => {
//       const allowedTypes = /vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel/;
//       if (allowedTypes.test(file.mimetype)) cb(null, true);
//       else cb(new Error("Only Excel files (.xls, .xlsx) are allowed"));
//     };
//   } else {
//     fileFilter = (req, file, cb) => cb(null, true); // default allow all
//   }

//   return multer({
//     storage,
//     limits: { fileSize: maxSize },
//     fileFilter
//   });
// };

// module.exports = {
//   uploadFile
// };
// // fileUpload.js
// const fs = require("fs");
// const path = require("path");
// const multer = require("multer");

// // Ensure directory exists
// const ensureDir = (dirPath) => {
//   if (!fs.existsSync(dirPath)) {
//     fs.mkdirSync(dirPath, { recursive: true });
//   }
// };

// // Clean user input for subfolder to prevent path exploits
// const cleanSubfolder = (subfolder) => {
//   return (subfolder || "")
//     .split("/")
//     .map(part => part.replace(/[^a-zA-Z0-9-_]/g, ""))
//     .filter(Boolean)
//     .join("/");
// };

// const uploadImage = (subfolder = "", fieldName = "file") => {
//   const base = "uploads/images"; // Static
//   const dynamic = cleanSubfolder(subfolder);
//   const folder = path.join(base, dynamic);
//   const maxSize = 2 * 1024 * 1024; // Set max image size (5MB) here

//   const storage = multer.memoryStorage();
//   const fileFilter = (req, file, cb) => {
//     const allowed = /png|webp/;
//     const ext = path.extname(file.originalname).toLowerCase();
//     const mime = file.mimetype;
//     if (allowed.test(ext) && allowed.test(mime)) {
//       cb(null, true);
//     } else {
//       cb(new Error("Only JPG, JPEG, PNG, and WEBP image files are allowed."));
//     }
//   };

//   const multerHandler = multer({
//     storage,
//     limits: { fileSize: maxSize },
//     fileFilter,
//   });

//   // Middleware: upload if file present, skip if not, always call next on no file
//   return (req, res, next) => {
//     multerHandler.single(fieldName)(req, res, (err) => {
//       if (err) {
//         // if (err.code === "LIMIT_FILE_SIZE") {
//         //   return res.status(400).json({ error: "Image file too large. Maximum allowed size is 2MB." });
//         // }
//         return res.status(400).json({ error: err.message });
//         // Multer error (invalid type, file too big, etc.)
//         // return res.status(400).json({ error: err.message });
//       }
//       if (!req.file) {
//         // No image: just call next (image optional)
//         return next();
//       }
//       // Save if there was an image
//       ensureDir(folder);
//       const ext = path.extname(req.file.originalname).toLowerCase();
//       const name = path.basename(req.file.originalname, ext).replace(/\s+/g, "_");
//       const filename = Date.now() + "_" + name + ext;
//       const fullPath = path.join(folder, filename);

//       fs.writeFile(fullPath, req.file.buffer, (err) => {
//         if (err) return res.status(500).json({ error: "Error saving file." });
//         req.savedFile = { path: fullPath, filename };
//         req.body[fieldName] = filename; // If you want to pass to controller with body
//         next();
//       });
//     });
//   };
// }
// helpers/fileUpload.js
const responseCodes = require("./responseCodes");
const fs = require("fs");
const path = require("path");
const multer = require("multer");

// Utility Functions
const ensureDir = dirPath => {
  if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
};
const cleanSubfolder = subfolder =>
  (subfolder || "")
    .split("/")
    .map(part => part.replace(/[^a-zA-Z0-9-_]/g, ""))
    .filter(Boolean)
    .join("/");

function sendErrorRes(res, responseCode) {
  return res.status(responseCode.status).json({
    code: responseCode.code,
    status: responseCode.status,
    message: responseCode.message
  });
}

// 1. Middleware: Buffers uploaded image to memory, never saves to disk
const bufferImage = (fieldName = "file") => {
  const maxSize = 2 * 1024 * 1024; // 2MB
  const storage = multer.memoryStorage();
  const fileFilter = (req, file, cb) => {
    const allowed = /jpeg|jpg|png|webp/;
    const ext = path.extname(file.originalname).toLowerCase();
    const mime = file.mimetype;
    if (allowed.test(ext) && allowed.test(mime)) cb(null, true);
    else {
      const err = new Error(responseCodes.FILE_TYPE_NOT_ALLOWED.message);
      err.customCode = "FILE_TYPE_NOT_ALLOWED";
      cb(err);
    }
  };
  const multerHandler = multer({ storage, limits: { fileSize: maxSize }, fileFilter });
  return (req, res, next) => {
    multerHandler.single(fieldName)(req, res, (err) => {
      if (err) {
        if (err.code === "LIMIT_FILE_SIZE") return sendErrorRes(res, responseCodes.FILE_TOO_LARGE);
        if (err.customCode === "FILE_TYPE_NOT_ALLOWED") return sendErrorRes(res, responseCodes.FILE_TYPE_NOT_ALLOWED);
        return sendErrorRes(res, responseCodes.SERVER_ERROR);
      }
      next();
    });
  };
};

// 2. Function: Save in-memory image buffer to disk after validation succeeds
const uploadImage = (req, subfolder = "", fieldName = "file") => {
  if (!req.file) return null; // No image to save
  const base = "uploads/images";
  const folder = path.join(base, cleanSubfolder(subfolder));
  ensureDir(folder);
  const ext = path.extname(req.file.originalname).toLowerCase();
  const name = path.basename(req.file.originalname, ext).replace(/\s+/g, "_");
  const filename = Date.now() + "_" + name + ext;
  const fullPath = path.join(folder, filename);
  try {
    fs.writeFileSync(fullPath, req.file.buffer);
    req.savedFile = { path: fullPath, filename };
    req.body[fieldName] = filename;
    return filename;
  } catch (err) {
    throw {
      code: responseCodes.FILE_UPLOAD_FAILED.code,
      status: responseCodes.FILE_UPLOAD_FAILED.status,
      message: responseCodes.FILE_UPLOAD_FAILED.message
    };
  }
};

module.exports = { bufferImage, uploadImage };



// Excel upload middleware
const uploadExcel = (folder = "uploads/excel/", maxSize = 5 * 1024 * 1024) => {
  const storage = multer.memoryStorage();

  const fileFilter = (req, file, cb) => {
    const allowedMime = /vnd.openxmlformats-officedocument.spreadsheetml.sheet|vnd.ms-excel/;
    const ext = path.extname(file.originalname).toLowerCase();
    if ((ext === '.xls' || ext === '.xlsx') && allowedMime.test(file.mimetype)) cb(null, true);
    else cb(new Error("Only Excel files (.xls, .xlsx) allowed"));
  };

  const multerHandler = multer({
    storage,
    limits: { fileSize: maxSize },
    fileFilter,
  });

  // Upload and save Excel file
  return (req, res, next) => {
    multerHandler.single('file')(req, res, (err) => {
      if (err) return next(err);
      if (!req.file) return next(new Error("No Excel file uploaded"));

      ensureDir(folder);
      const ext = path.extname(req.file.originalname).toLowerCase();
      const name = path.basename(req.file.originalname, ext).replace(/\s+/g, "_");
      const filename = Date.now() + "_" + name + ext;
      const fullPath = path.join(folder, filename);

      fs.writeFile(fullPath, req.file.buffer, (err) => {
        if (err) return next(err);
        req.savedFile = { path: fullPath, filename };
        next();
      });
    });
  };
};

// module.exports = {
//   uploadImage,
//   uploadExcel
// };
