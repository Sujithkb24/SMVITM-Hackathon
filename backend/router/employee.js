const express = require("express");
const {
  registerEmployee,
  loginEmployee,
  getEmployeeProfile,
  logoutEmployee,
} = require("../controller/employee");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", registerEmployee);
router.post("/login", loginEmployee);
router.get("/profile", protect,getEmployeeProfile);
router.post("/logout", protect, logoutEmployee);

module.exports = router;
