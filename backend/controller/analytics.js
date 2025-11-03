const Analytics = require("../models/analytics");
const { 
  getOrCreateDailyAnalytics, 
  createMonthlyAnalyticsIfNeeded,
  getTodayIST 
} = require("../utils/analytics-helper");

// @desc Get today's analytics
// @route GET /api/analytics/today
exports.getTodayAnalytics = async (req, res) => {
  try {
    const analytics = await getOrCreateDailyAnalytics();
    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get analytics by date
// @route GET /api/analytics/date/:date
exports.getAnalyticsByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    date.setHours(0, 0, 0, 0);

    const analytics = await Analytics.findOne({
      date: date,
      type: 'daily'
    });

    if (!analytics) {
      return res.status(404).json({ message: "Analytics not found for this date" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get analytics for a date range
// @route GET /api/analytics/range?start=YYYY-MM-DD&end=YYYY-MM-DD
exports.getAnalyticsRange = async (req, res) => {
  try {
    const { start, end } = req.query;

    if (!start || !end) {
      return res.status(400).json({ message: "Please provide start and end dates" });
    }

    const startDate = new Date(start);
    const endDate = new Date(end);
    startDate.setHours(0, 0, 0, 0);
    endDate.setHours(23, 59, 59, 999);

    const analytics = await Analytics.find({
      date: {
        $gte: startDate,
        $lte: endDate
      },
      type: 'daily'
    }).sort({ date: 1 });

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all monthly analytics
// @route GET /api/analytics/monthly
exports.getMonthlyAnalytics = async (req, res) => {
  try {
    const monthlyAnalytics = await Analytics.find({
      type: 'monthly'
    }).sort({ date: -1 });

    res.status(200).json(monthlyAnalytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get specific month analytics
// @route GET /api/analytics/monthly/:year/:month
exports.getMonthAnalytics = async (req, res) => {
  try {
    const { year, month } = req.params;

    const analytics = await Analytics.findOne({
      type: 'monthly',
      year: parseInt(year),
      month: parseInt(month)
    });

    if (!analytics) {
      return res.status(404).json({ message: "Monthly analytics not found" });
    }

    res.status(200).json(analytics);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Manually trigger monthly analytics creation
// @route POST /api/analytics/create-monthly
exports.createMonthlyAnalytics = async (req, res) => {
  try {
    const monthlyAnalytics = await createMonthlyAnalyticsIfNeeded();

    if (!monthlyAnalytics) {
      return res.status(400).json({ 
        message: "Monthly analytics already exists or it's not time yet (must be after 9 PM IST)" 
      });
    }

    res.status(201).json({
      message: "Monthly analytics created successfully",
      analytics: monthlyAnalytics
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get analytics summary
// @route GET /api/analytics/summary
exports.getAnalyticsSummary = async (req, res) => {
  try {
    const today = await getOrCreateDailyAnalytics();
    
    // Get this month's total
    const now = getTodayIST();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    const monthlyData = await Analytics.find({
      type: 'daily',
      date: {
        $gte: startOfMonth,
        $lte: endOfMonth
      }
    });

    const monthTotal = monthlyData.reduce((acc, day) => {
      acc.breakfastCount += day.breakfastCount || 0;
      acc.lunchCount += day.lunchCount || 0;
      acc.dinnerCount += day.dinnerCount || 0;
      return acc;
    }, { breakfastCount: 0, lunchCount: 0, dinnerCount: 0 });

    res.status(200).json({
      today: {
        date: today.date,
        breakfastCount: today.breakfastCount,
        lunchCount: today.lunchCount,
        dinnerCount: today.dinnerCount
      },
      thisMonth: {
        month: now.getMonth() + 1,
        year: now.getFullYear(),
        breakfastCount: monthTotal.breakfastCount,
        lunchCount: monthTotal.lunchCount,
        dinnerCount: monthTotal.dinnerCount
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};