const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  fullName: { type: String },
  password: { type: String },
});

const Admin = mongoose.model("Admin", adminSchema);

module.exports = Admin;
