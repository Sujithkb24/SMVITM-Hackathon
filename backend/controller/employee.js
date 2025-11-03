const Employee = require("../models/employee/employee");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const axios = require('axios');
const fs = require('fs');
const path = require('path');

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

// @desc Protected route example
// @route GET /api/employees/profile
exports.getEmployeeProfile = async (req, res) => {
  try {
    console.log(req.user.id)
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


/// Generate QR code for logged-in employee
exports.generateEmployeeQR = async (req, res) => {
  try {
    const employee = await Employee.findById(req.user.id).select("-password");
    
    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: 'Employee not found' 
      });
    }

    // Generate QR code URL with employee ID
    const employeeId = employee._id.toString();
    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(employeeId)}&size=300&margin=2`;
    
    // Define file name and path
    const fileName = `qr_${employeeId}_${Date.now()}.png`;
    const filePath = path.join(__dirname, '../public/assets/qrcodes', fileName);
    
    // Ensure the directory exists
    const dir = path.dirname(filePath);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    // Download and save the QR code image
    const response = await axios({
      url: qrCodeUrl,
      method: 'GET',
      responseType: 'stream'
    });

    const writer = fs.createWriteStream(filePath);
    response.data.pipe(writer);

    // Wait for the file to be written
    await new Promise((resolve, reject) => {
      writer.on('finish', resolve);
      writer.on('error', reject);
    });

    // Generate the public URL to access the saved image
    const publicUrl = `/assets/qrcodes/${fileName}`;

    res.json({
      success: true,
      data: {
        employeeId: employeeId,
        employeeName: employee.name,
        employeeEmail: employee.email,
        qrCodeImage: publicUrl,
        qrCodePath: filePath
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Generate QR code for specific employee by ID (admin use)
exports.generateQRForEmployee = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId).select("-password");
    
    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: 'Employee not found' 
      });
    }

    const qrCodeUrl = `https://quickchart.io/qr?text=${encodeURIComponent(employeeId)}&size=300&margin=2`;

    res.json({
      success: true,
      data: {
        employeeId: employeeId,
        employeeName: employee.name,
        employeeEmail: employee.email,
        qrCodeUrl: qrCodeUrl
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: error.message 
    });
  }
};

// Verify employee by scanning QR code (public route)
exports.verifyEmployeeQR = async (req, res) => {
  try {
    const { employeeId } = req.params;

    const employee = await Employee.findById(employeeId).select("-password");
    
    if (!employee) {
      return res.status(404).json({ 
        success: false,
        message: 'Invalid QR code or employee not found' 
      });
    }

    res.json({
      success: true,
      message: 'Employee verified successfully',
      data: {
        name: employee.name,
        email: employee.email,
        employeeId: employee._id,
        department: employee.department || 'N/A',
        position: employee.position || 'N/A',
        verified: true
      }
    });

  } catch (error) {
    res.status(500).json({ 
      success: false,
      message: 'Error verifying employee',
      error: error.message 
    });
  }
};