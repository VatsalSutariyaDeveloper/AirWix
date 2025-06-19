const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const sequelize = require('./config/database');
const responseFormatter = require("./middlewares/responseFormatter");
const masterRoutes = require("./routes/masterRoutes");
const masterItemRoutes = require("./routes/masterItemRoutes");
const crmRoutes = require("./routes/crmRoutes");
const user = require("./routes/userRoutes");
const multer = require('multer');
const path = require('path');


dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseFormatter);

// Load master routes
app.use("/masters/item", masterItemRoutes);
app.use("/masters", masterRoutes);
app.use("/crm/inquiry", crmRoutes);
app.use("/user", user);

// after all routes
// Global error handler
app.use((err, req, res, next) => {
  // Handle Multer file size limit error
  if (err instanceof multer.MulterError && err.code === "LIMIT_FILE_SIZE") {
    const maxMb = (req.maxFileSize || 5 * 1024 * 1024) / 1024 / 1024;
    return res.status(400).json({
      status: false,
      code: "FILE_TOO_LARGE",
      message: `File too large. Max allowed size is ${maxMb} MB`,
    });
  }

  // File type validation error
  if (err.message && err.message.startsWith("Only")) {
    return res.status(400).json({
      status: false,
      code: "INVALID_FILE_TYPE",
      message: err.message,
    });
  }

  // Generic fallback error
  return res.status(500).json({
    status: false,
    code: "SERVER_ERROR",
    message: "Internal Server Error",
    error: err.message,
  });
});



// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
