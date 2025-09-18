const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  emailOtp: String,
  phone: String,
  phoneOtp: String,
  isVerified: { type: Boolean, default: false }
});

module.exports = mongoose.model("User", userSchema);
