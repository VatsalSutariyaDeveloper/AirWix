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
app.use((err, req, res, next) => {
  if (err instanceof multer.MulterError || err.message.includes("Only")) {
    return res.status(400).json({
      status: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    status: false,
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
