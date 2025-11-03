const mongoose = require("mongoose");

const dayOrdersSchema = new mongoose.Schema(
  {
    emp_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Employee",
      required: true,
    },
    date: {
      type: Date,
      required: true,
      default: Date.now,
    },
    ordered_breakfast: {
      type: Boolean,
      default: false,
    },
    ordered_lunch: {
      type: Boolean,
      default: false,
    },
    ordered_snack: {
      type: Boolean,
      default: false,
    },
    served_breakfast: {
      type: Boolean,
      default: false,
    },
    served_lunch: {
      type: Boolean,
      default: false,
    },
    served_dinner: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

// Create a compound index to ensure one order per employee per day
dayOrdersSchema.index({ emp_id: 1, date: 1 }, { unique: true });

// Pre-save middleware to track changes for analytics
dayOrdersSchema.pre('save', function(next) {
  if (!this.isNew) {
    // Track what changed
    this._changes = {
      breakfast: this.isModified('ordered_breakfast') ? {
        old: this._doc.ordered_breakfast,
        new: this.ordered_breakfast
      } : null,
      lunch: this.isModified('ordered_lunch') ? {
        old: this._doc.ordered_lunch,
        new: this.ordered_lunch
      } : null,
      dinner: this.isModified('served_dinner') ? {
        old: this._doc.served_dinner,
        new: this.served_dinner
      } : null
    };
  }
  next();
});

module.exports = mongoose.model("DayOrders", dayOrdersSchema);