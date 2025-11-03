const express = require("express");
const {
  createOrGetOrder,
  getOrderById,
  getOrdersByDate,
  getOrdersByEmployee,
  toggleField,
  updateOrder,
  deleteOrder,
  getTodaySummary,
} = require("../controller/dayorder");
const { protect } = require("../middleware/authMiddleware");
const { getOrderByToken } = require("../utils/analytics-helper");

const router = express.Router();

// Create or get today's order
router.post("/", protect, createOrGetOrder);

// Get today's summary
router.get("/today/summary", protect, getTodaySummary);

// Get order by ID
router.get("/:id", protect, getOrderById);

// Get orders by date
router.get("/date/:date", protect, getOrdersByDate);

// Get orders by employee
router.get("/employee/:emp_id", protect, getOrdersByEmployee);

// Toggle a specific field
router.patch("/:id/toggle", protect, toggleField);

// Update order
router.patch("/:id", protect, updateOrder);

// Delete order
router.delete("/:id", protect, deleteOrder);

router.post("/get-token", getOrderByToken);

module.exports = router;