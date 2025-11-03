const Employee = require("../models/employee/employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Helper: Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });
};

// @desc Register new employee
// @route POST /api/employees/register
exports.registerEmployee = async (req, res) => {
  try {
    const { name, email, password, phoneNumber } = req.body;

    const existing = await Employee.findOne({ email });
    if (existing) return res.status(400).json({ message: "Employee already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const employee = await Employee.create({
      name,
      email,
      password: hashedPassword,
      phoneNumber: phoneNumber || null,
    });

    const token = generateToken(employee._id);

    res.status(201).json({
      message: "Employee registered successfully",
      token,
      employee: {
        id: employee._id,
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Login employee
// @route POST /api/employees/login
exports.loginEmployee = async (req, res) => {
  try {
    const { email, password } = req.body;

    const employee = await Employee.findOne({ email });
    if (!employee) return res.status(404).json({ message: "Employee not found" });

    const isMatch = await bcrypt.compare(password, employee.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(employee._id);

    res.json({
      message: "Login successful",
      token,
      employee: {
        id: employee._id.toString(),
        name: employee.name,
        email: employee.email,
        phoneNumber: employee.phoneNumber,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Protected route example
// @route GET /api/employees/profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select("-password");
    res.json(employee);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc Logout employee
// @route POST /api/employees/logout
exports.logoutEmployee = async (req, res) => {
  try {
    // For stateless JWT, just tell client to remove token
    res.status(200).json({ message: "Logout successful. Please remove token on client side." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
