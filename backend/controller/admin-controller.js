const Admin = require("../models/admin-model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const createAdmin = async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    console.log("Existing admin:", existingAdmin);

    // 🔒 Check if admin already exists
    if (existingAdmin) {
      console.log("Admin already exists, returning 400...");
      return res.status(400).json({ message: "Admin with this email already exists" });
    }

    // 🔑 Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 🆕 Create new admin
    const newAdmin = new Admin({
      email,
      fullName,
      password: hashedPassword,
    });

    await newAdmin.save();
    console.log("New admin created:", newAdmin);
    return res.status(201).json({ message: "Admin created successfully" });

  } catch (err) {
    console.error("Error in createAdmin:", err);
    return res.status(500).json({ error: err.message });
  }
};

const loginAdmin = async (req, res) => {
  // Implementation for admin login (not provided in the snippet)
  try {
    const { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ message: "Admin not found" });
    }
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const jwttoken = jwt.sign({email: admin.email, id: admin._id}, process.env.JWT_SECRET, {expiresIn: '1h'})
    return res.status(200).json({ message: "Login successful", token: jwttoken });
}
  catch (err) {
    console.error("Error in loginAdmin:", err);
    return res.status(500).json({ error: err.message });
  }
};

module.exports = { createAdmin, loginAdmin };
