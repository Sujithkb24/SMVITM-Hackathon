const express = require("express");
const {
  registerEmployee,
  loginEmployee,
  getEmployeeProfile,
  logoutEmployee,
  generateEmployeeQR,
  generateQRForEmployee,
  verifyEmployeeQR
} = require("../controller/employee");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.post("/logout", protect, logoutEmployee);


router.get("/profile", protect, getEmployeeProfile);


router.get("/qr-code", protect, generateEmployeeQR); // Generate QR for logged-in employee
router.get("/qr-code/:employeeId", protect, generateQRForEmployee); // Generate QR for specific employee (admin use)
router.get("/verify/:employeeId", verifyEmployeeQR); // Verify employee from QR code (public route)

module.exports = router;

