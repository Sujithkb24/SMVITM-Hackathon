const express = require("express");
const router = express.Router();
const { createAdmin , loginAdmin} = require("../controller/admin-controller");

router.route('/create-admin').post(createAdmin);
router.route('/login-admin').post(loginAdmin);
module.exports = router;
