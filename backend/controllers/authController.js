const nodemailer = require("nodemailer");
const User = require("../models/User");
const Otp = require("../models/Otp");
require("dotenv").config();

// ✅ Email transporter setup
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send Email OTP
exports.sendEmailOtp = async (req, res) => {
  const { email } = req.body;
  if (!email || typeof email !== "string") {
    return res.status(400).json({ success: false, message: "Invalid or missing email" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000).toString();
  const expiresAt = new Date(Date.now() + 2 * 60 * 1000); // 2 minutes

  try {
    await Otp.create({ identifier: email, otp, type: "email", expiresAt });

    const mailOptions = {
      from: `"POWERGRID India" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your POWERGRID OTP Code",
      html: `
        <h2>POWERGRID</h2>
        <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
        <p>This code is valid for 2 minutes.</p>
        <br />
        <p>Thank you,<br />POWERGRID India Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log(`✅ Email OTP ${otp} sent to ${email}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error sending email OTP:", error.message);
    res.status(500).json({ success: false, message: "Failed to send OTP" });
  }
};

// ✅ Verify Email OTP
exports.verifyEmailOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const otpDoc = await Otp.findOne({
      identifier: email,
      otp,
      type: "email",
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email });
    }
    await user.save();

    await Otp.deleteMany({ identifier: email, type: "email" });

    const existingUser = !!user.phone;
    res.status(200).json({ success: true, existingUser });
  } catch (error) {
    console.error("❌ Error verifying email OTP:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Send Phone OTP
exports.sendPhoneOtp = async (req, res) => {
  const { email, phone } = req.body;
  if (!phone || !/^\+\d{10,15}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Invalid phone number" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    const expiresAt = new Date(Date.now() + 2 * 60 * 1000);

    user.phone = phone;
    await user.save();

    await Otp.create({ identifier: phone, otp, type: "phone", expiresAt });

    console.log(`📲 Phone OTP ${otp} sent to ${phone}`);
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error sending phone OTP:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

// ✅ Verify Phone OTP
exports.verifyPhoneOtp = async (req, res) => {
  const { phone, otp } = req.body;

  try {
    const otpDoc = await Otp.findOne({
      identifier: phone,
      otp,
      type: "phone",
      expiresAt: { $gt: new Date() }
    });

    if (!otpDoc) {
      return res.status(400).json({ success: false, message: "Invalid or expired OTP" });
    }

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ success: false, message: "User not found" });

    user.isVerified = true;
    await user.save();

    await Otp.deleteMany({ identifier: phone, type: "phone" });

    res.status(200).json({ success: true });
  } catch (error) {
    console.error("❌ Error verifying phone OTP:", error.message);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
