const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const { ClerkExpressRequireAuth } = require("@clerk/clerk-sdk-node");
const connectDB = require("./db/db");
const userRoutes = require("./router/admin");

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api", ClerkExpressRequireAuth(), userRoutes);

// Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
