const mongoose = require("mongoose");

const analyticsSchema = new mongoose.Schema({
  date: { 
    type: Date, 
    unique: true,
    required: true 
  },
  breakfastCount: { 
    type: Number, 
    default: 0 
  },
  lunchCount: { 
    type: Number, 
    default: 0 
  },
  dinnerCount: { 
    type: Number, 
    default: 0 
  },
  type: {
    type: String,
    enum: ['daily', 'monthly'],
    default: 'daily'
  },
  month: Number,  // Store month for monthly analytics
  year: Number    // Store year for monthly analytics
}, { timestamps: true });

const Analytics = mongoose.model("Analytics", analyticsSchema);

module.exports = Analytics;