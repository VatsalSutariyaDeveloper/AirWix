const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const bodyParser = require("body-parser");
const sequelize = require('./config/database');
const responseFormatter = require("./middlewares/responseFormatter");
const errorHandler = require("./middlewares/errorHandler");
const masterRoutes = require("./routes/masterRoutes");
const masterItemRoutes = require("./routes/masterItemRoutes");
const crmRoutes = require("./routes/crmRoutes");
const purchaseRoutes = require("./routes/purchaseRoutes");
const productionRoutes = require("./routes/productionRoutes");
const administrationRoutes = require("./routes/administrationRoutes");
const user = require("./routes/userRoutes");
const designDepartmentRoutes = require("./routes/designDepartmentRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");


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
app.use("/crm", crmRoutes);
app.use("/purchase", purchaseRoutes);
app.use("/production", productionRoutes);
app.use("/administration", administrationRoutes);
app.use("/user", user);
app.use("/design-department", designDepartmentRoutes);
app.use("/inventory", inventoryRoutes);


app.use(errorHandler);


// Sync DB and start server
sequelize.sync().then(() => {
  console.log('Database synced');
  app.listen(process.env.PORT, () =>
    console.log(`Server running on port ${process.env.PORT}`)
  );
});
