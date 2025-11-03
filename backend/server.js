const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db");
const employeeRoutes = require("./router/employee");
const itemRoutes = require("./router/item-router");
const adminRoutes = require("./router/admin-router");

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());


app.use("/api/items", itemRoutes);
app.use("/api/admins", adminRoutes);

// Connect to MongoDB
connectDB();
// Server
app.use("/api/employees", employeeRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
