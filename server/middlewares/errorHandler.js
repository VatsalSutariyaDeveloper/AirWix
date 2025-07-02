const multer = require("multer");

// Global error handler
module.exports = (err, req, res, next) => {
  // Handle Multer file size limit error
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    const maxMb = (req.maxFileSize || 5 * 1024 * 1024) / 1024 / 1024;
    return res.status(400).json({
      status: false,
      code: "FILE_TOO_LARGE",
      message: `File too large. Max allowed size is ${maxMb} MB`,
    });
  }

  // File type validation error (custom from fileFilter)
  if (err.code === "INVALID_FILE_TYPE") {
    return res.status(400).json({
      status: false,
      code: "INVALID_FILE_TYPE",
      message: err.message || "Invalid file type",
    });
  }

  // Generic fallback error
  return res.status(500).json({
    status: false,
    code: "SERVER_ERROR",
    message: "Internal Server Error",
    error: err.message,
  });
};
