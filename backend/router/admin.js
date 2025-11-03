const express = require("express");
const router = express.Router();
const { saveUser } = require("../controller/user");

// Route: POST /api/save-user
router.post("/admin-save", saveUser);

module.exports = router;
