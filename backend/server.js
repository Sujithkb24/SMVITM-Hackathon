const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./db/db");

// Import all routes
const employeeRoutes = require("./router/employee");
const itemRoutes = require("./router/item-router");
const adminRoutes = require("./router/admin-router");
const dayOrdersRoutes = require("./router/dayorder")
const analyticsRouter = require("./router/analytics")
const telegramRouter = require("./router/telegram-route")
dotenv.config();

// Connect to MongoDB (only once!)
const app = express();

// ✅ Allow requests from your React frontend
app.use(cors({
  origin: "http://localhost:3000",  // React runs on this port
  credentials: true,
}));

// ✅ Parse incoming JSON data
app.use(express.json());
app.use(express.static('public'));



app.use("/api/items", itemRoutes);
app.use("/api/admins", adminRoutes); // <-- Admin Login/Register routes
app.use("/api/analytics", analyticsRouter);
app.use("/api/employees", employeeRoutes);
app.use("/api/day-orders", dayOrdersRoutes);
app.use("/api/telegram",telegramRouter );
// Connect to MongoDB

// Server

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
