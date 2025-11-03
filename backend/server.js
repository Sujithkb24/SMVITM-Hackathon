const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db");
const employeeRoutes = require("./router/employee");
const itemRoutes = require("./router/item-router");
const adminRoutes = require("./router/admin-router");
const dayOrdersRoutes = require("./router/dayorder")
const analyticsRouter = require("./router/analytics")

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('public'));



app.use("/api/items", itemRoutes);
app.use("/api/admins", adminRoutes);
app.use("/api/analytics", analyticsRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/day-orders", dayOrdersRoutes);
// Connect to MongoDB
connectDB();
// Server


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
