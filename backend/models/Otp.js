const mongoose = require("mongoose");

const otpSchema = new mongoose.Schema({
  identifier: { type: String, required: true }, // email or phone
  otp: { type: String, required: true },
  type: { type: String, enum: ["email", "phone"], required: true },
  expiresAt: { type: Date, required: true }
}, { timestamps: true });

module.exports = mongoose.model("Otp", otpSchema);
