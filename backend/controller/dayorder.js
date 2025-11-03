const DayOrders = require("../models/employee/dayorder");
const { updateAnalytics } = require("../utils/analytics-helper");

// @desc Create or get today's order for an employee
// @route POST /api/day-orders
exports.createOrGetOrder = async (req, res) => {
  try {
    const { emp_id } = req.body;
    
    // Get start of today
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // Check if order already exists for today
    let order = await DayOrders.findOne({
      emp_id,
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    if (!order) {
      // Create new order for today
      order = await DayOrders.create({
        emp_id,
        date: today,
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get order by ID
// @route GET /api/day-orders/:id
exports.getOrderById = async (req, res) => {
  try {
    const order = await DayOrders.findById(req.params.id).populate(
      "emp_id",
      "name email"
    );
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders for a specific date
// @route GET /api/day-orders/date/:date
exports.getOrdersByDate = async (req, res) => {
  try {
    const date = new Date(req.params.date);
    date.setHours(0, 0, 0, 0);

    const orders = await DayOrders.find({
      date: {
        $gte: date,
        $lt: new Date(date.getTime() + 24 * 60 * 60 * 1000),
      },
    }).populate("emp_id", "name email phoneNumber");

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get all orders for an employee
// @route GET /api/day-orders/employee/:emp_id
exports.getOrdersByEmployee = async (req, res) => {
  try {
    const orders = await DayOrders.find({ emp_id: req.params.emp_id }).sort({
      date: -1,
    });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Toggle a boolean field
// @route PATCH /api/day-orders/:id/toggle
exports.toggleField = async (req, res) => {
  try {
    const { field } = req.body;

    // Validate field name
    const validFields = [
      "ordered_breakfast",
      "ordered_lunch",
      "ordered_snack",
      "served_breakfast",
      "served_lunch",
      "served_dinner",
    ];

    if (!validFields.includes(field)) {
      return res.status(400).json({ message: "Invalid field name" });
    }

    const order = await DayOrders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Store old value for analytics
    const oldValue = order[field];

    // Toggle the boolean value (both directions allowed)
    order[field] = !order[field];
    await order.save();

    // Update analytics for breakfast, lunch, and dinner
    const changes = {};
    if (field === 'ordered_breakfast') {
      changes.breakfast = { old: oldValue, new: order[field] };
    } else if (field === 'ordered_lunch') {
      changes.lunch = { old: oldValue, new: order[field] };
    } else if (field === 'served_dinner') {
      changes.dinner = { old: oldValue, new: order[field] };
    }

    // Update analytics if relevant field changed
    if (Object.keys(changes).length > 0) {
      await updateAnalytics(changes);
    }

    res.status(200).json({
      message: `${field} toggled to ${order[field]} successfully`,
      order,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Update multiple fields at once
// @route PATCH /api/day-orders/:id
exports.updateOrder = async (req, res) => {
  try {
    const allowedUpdates = [
      "ordered_breakfast",
      "ordered_lunch",
      "ordered_snack",
      "served_breakfast",
      "served_lunch",
      "served_dinner",
    ];

    const order = await DayOrders.findById(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Track changes for analytics
    const changes = {};
    
    if (req.body.ordered_breakfast !== undefined && 
        order.ordered_breakfast !== req.body.ordered_breakfast) {
      changes.breakfast = {
        old: order.ordered_breakfast,
        new: req.body.ordered_breakfast
      };
    }

    if (req.body.ordered_lunch !== undefined && 
        order.ordered_lunch !== req.body.ordered_lunch) {
      changes.lunch = {
        old: order.ordered_lunch,
        new: req.body.ordered_lunch
      };
    }

    if (req.body.served_dinner !== undefined && 
        order.served_dinner !== req.body.served_dinner) {
      changes.dinner = {
        old: order.served_dinner,
        new: req.body.served_dinner
      };
    }

    // Apply updates
    const updates = {};
    Object.keys(req.body).forEach((key) => {
      if (allowedUpdates.includes(key)) {
        updates[key] = req.body[key];
      }
    });

    const updatedOrder = await DayOrders.findByIdAndUpdate(
      req.params.id,
      updates,
      { new: true, runValidators: true }
    );

    // Update analytics if any relevant fields changed
    if (Object.keys(changes).length > 0) {
      await updateAnalytics(changes);
    }

    res.status(200).json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Delete an order
// @route DELETE /api/day-orders/:id
exports.deleteOrder = async (req, res) => {
  try {
    const order = await DayOrders.findByIdAndDelete(req.params.id);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ message: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Get today's orders summary
// @route GET /api/day-orders/today/summary
exports.getTodaySummary = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const orders = await DayOrders.find({
      date: {
        $gte: today,
        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000),
      },
    });

    const summary = {
      total_orders: orders.length,
      breakfast: {
        ordered: orders.filter((o) => o.ordered_breakfast).length,
        served: orders.filter((o) => o.served_breakfast).length,
      },
      lunch: {
        ordered: orders.filter((o) => o.ordered_lunch).length,
        served: orders.filter((o) => o.served_lunch).length,
      },
      snack: {
        ordered: orders.filter((o) => o.ordered_snack).length,
      },
      dinner: {
        served: orders.filter((o) => o.served_dinner).length,
      },
    };

    res.status(200).json(summary);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
