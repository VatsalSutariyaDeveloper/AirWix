const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const sequelize = require('./config/database');
const responseFormatter = require("./middlewares/responseFormatter");
const itemRoutes = require("./routes/masterRoutes");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(responseFormatter);

// Load item master routes
app.use("/masters/item", itemRoutes);

// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
