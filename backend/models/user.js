const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  clerkId: { type: String, required: true, unique: true },
  email: { type: String },
  firstName: { type: String },
  lastName: { type: String },
});

const User = mongoose.model("User", userSchema);

module.exports = User;