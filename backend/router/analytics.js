const express = require("express");
const {
  getTodayAnalytics,
  getAnalyticsByDate,
  getAnalyticsRange,
  getMonthlyAnalytics,
  getMonthAnalytics,
  createMonthlyAnalytics,
  getAnalyticsSummary
} = require("../controller/analytics");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Get summary (today + this month)
router.get("/summary", protect, getAnalyticsSummary);

// Get today's analytics
router.get("/today", protect, getTodayAnalytics);

// Get analytics by specific date
router.get("/date/:date", protect, getAnalyticsByDate);

// Get analytics for date range
router.get("/range", protect, getAnalyticsRange);

// Get all monthly analytics
router.get("/monthly", protect, getMonthlyAnalytics);

// Get specific month analytics
router.get("/monthly/:year/:month", protect, getMonthAnalytics);

// Manually create monthly analytics
router.post("/create-monthly", protect, createMonthlyAnalytics);

module.exports = router;