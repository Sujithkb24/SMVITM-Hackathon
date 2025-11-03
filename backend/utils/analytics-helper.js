const Analytics = require("../models/analytics");
const jwt = require("jsonwebtoken");
const Employee = require("../models/employee/employee");
const DayOrders = require("../models/employee/dayorder");
// Get current time in IST
const getISTDate = () => {
  const now = new Date();
  const istOffset = 5.5 * 60 * 60 * 1000; // IST is UTC+5:30
  return new Date(now.getTime() + istOffset);
};

// Check if it's after 9 PM IST
const isAfter9PMIST = () => {
  const istDate = getISTDate();
  const hour = istDate.getHours();
  return hour >= 21; // 21:00 is 9 PM
};

// Get today's date at midnight IST
const getTodayIST = () => {
  const istDate = getISTDate();
  istDate.setHours(0, 0, 0, 0);
  return istDate;
};

// Get or create daily analytics
const getOrCreateDailyAnalytics = async () => {
  const today = getTodayIST();
  
  let analytics = await Analytics.findOne({ 
    date: today,
    type: 'daily'
  });

  if (!analytics) {
    analytics = await Analytics.create({
      date: today,
      type: 'daily',
      breakfastCount: 0,
      lunchCount: 0,
      dinnerCount: 0
    });
  }

  return analytics;
};

// Create monthly analytics if needed
const createMonthlyAnalyticsIfNeeded = async () => {
  if (!isAfter9PMIST()) {
    return null; // Only create after 9 PM IST
  }

  const istDate = getISTDate();
  const month = istDate.getMonth() + 1; // 1-12
  const year = istDate.getFullYear();

  // Check if monthly analytics already exists for this month
  const existingMonthly = await Analytics.findOne({
    type: 'monthly',
    month: month,
    year: year
  });

  if (existingMonthly) {
    return existingMonthly;
  }

  // Check if we need to create monthly analytics (end of month or one month passed)
  const lastMonthlyAnalytics = await Analytics.findOne({ 
    type: 'monthly' 
  }).sort({ date: -1 });

  if (!lastMonthlyAnalytics) {
    // First time creating monthly analytics
    const monthlyAnalytics = await createMonthlyAnalytics(month, year);
    return monthlyAnalytics;
  }

  // Check if one month has passed since last monthly analytics
  const lastDate = new Date(lastMonthlyAnalytics.date);
  const monthsPassed = (year - lastDate.getFullYear()) * 12 + 
                       (month - (lastDate.getMonth() + 1));

  if (monthsPassed >= 1) {
    const monthlyAnalytics = await createMonthlyAnalytics(month, year);
    return monthlyAnalytics;
  }

  return null;
};

// Create monthly analytics by aggregating daily data
const createMonthlyAnalytics = async (month, year) => {
  // Get all daily analytics for the previous month
  const startDate = new Date(year, month - 2, 1); // Previous month
  const endDate = new Date(year, month - 1, 0); // Last day of previous month

  const dailyAnalytics = await Analytics.find({
    type: 'daily',
    date: {
      $gte: startDate,
      $lte: endDate
    }
  });

  // Sum up the counts
  const totals = dailyAnalytics.reduce((acc, day) => {
    acc.breakfastCount += day.breakfastCount || 0;
    acc.lunchCount += day.lunchCount || 0;
    acc.dinnerCount += day.dinnerCount || 0;
    return acc;
  }, { breakfastCount: 0, lunchCount: 0, dinnerCount: 0 });

  // Create monthly analytics
  const monthlyAnalytics = await Analytics.create({
    date: new Date(year, month - 1, 1), // First day of current month
    type: 'monthly',
    month: month - 1 || 12, // Previous month
    year: month === 1 ? year - 1 : year,
    breakfastCount: totals.breakfastCount,
    lunchCount: totals.lunchCount,
    dinnerCount: totals.dinnerCount
  });

  return monthlyAnalytics;
};

// Update analytics based on order changes
const updateAnalytics = async (changes) => {
  const analytics = await getOrCreateDailyAnalytics();

  // Update breakfast count
  if (changes.breakfast) {
    if (changes.breakfast.old === false && changes.breakfast.new === true) {
      analytics.breakfastCount += 1;
    } else if (changes.breakfast.old === true && changes.breakfast.new === false) {
      analytics.breakfastCount = Math.max(0, analytics.breakfastCount - 1);
    }
  }

  // Update lunch count
  if (changes.lunch) {
    if (changes.lunch.old === false && changes.lunch.new === true) {
      analytics.lunchCount += 1;
    } else if (changes.lunch.old === true && changes.lunch.new === false) {
      analytics.lunchCount = Math.max(0, analytics.lunchCount - 1);
    }
  }

  // Update dinner count
  if (changes.dinner) {
    if (changes.dinner.old === false && changes.dinner.new === true) {
      analytics.dinnerCount += 1;
    } else if (changes.dinner.old === true && changes.dinner.new === false) {
      analytics.dinnerCount = Math.max(0, analytics.dinnerCount - 1);
    }
  }

  await analytics.save();

  // Check if we need to create monthly analytics
  await createMonthlyAnalyticsIfNeeded();

  return analytics;
};


const getOrderByToken = async (req, res) => {
  try {
    const { token } = req.body;
    console.log(token)
    if (!token) {
      return res.status(400).json({ message: "Token required in request body" });
    }

    // Decode the JWT token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const employeeId = decoded.id;

    // Find the order using employee ID
    const order = await DayOrders.findOne({ emp_id: employeeId });

    if (!order) {
      return res.status(404).json({ message: "Order not found for this employee" });
    }

    // ✅ Only return the order ID
    res.status(200).json({ order_id: order._id });

  } catch (error) {
    console.error(error);
    if (error.name === "JsonWebTokenError") {
      return res.status(400).json({ message: "Invalid token" });
    }
    res.status(500).json({ message: error.message });
  }
};


module.exports = {
  getOrCreateDailyAnalytics,
  createMonthlyAnalyticsIfNeeded,
  updateAnalytics,
  isAfter9PMIST,
  getISTDate,
  getTodayIST,
  getOrderByToken
};