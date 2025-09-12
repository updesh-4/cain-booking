const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// In-memory OTP store: { email or phone: { otp, expiresAt } }
const otpStore = {};

// ✅ Simulated DB lookup — replace with real DB query later
async function findUserByEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockExistingUsers = ["vidhiichauhan7@gmail.com", "example@domain.com"];
      const user = mockExistingUsers.includes(email) ? { email } : null;
      resolve(user);
    }, 100);
  });
}

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ✅ Send OTP to email
app.post("/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ success: false, message: "Invalid or missing email" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = Date.now() + 2 * 60 * 1000;

  otpStore[email] = { otp, expiresAt };
  console.log(`Generated OTP ${otp} for ${email}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

  const mailOptions = {
    from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
    to: email,
    subject: "Your POWERGRID OTP Code",
    html: `
      <h2>POWERGRID</h2>
      <p>Hi there,</p>
      <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
      <p>This code is valid for 2 minutes.</p>
      <br />
      <p>Thank you,<br />POWERGRID India Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Verify email OTP
app.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Missing email or OTP" });
  }

  const record = otpStore[email];
  console.log("Verifying email:", email);
  console.log("Received OTP:", otp);
  console.log("Stored record:", record);

  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP found for this email" });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp.toString().trim() !== otp.toString().trim()) {
    return res.status(400).json({ success: false, message: "Incorrect OTP" });
  }

  try {
    const user = await findUserByEmail(email);
    const isExistingUser = !!user;

    console.log("User lookup result:", user);

    delete otpStore[email];
    console.log(`✅ Email OTP verified for ${email} — Existing user: ${isExistingUser}`);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      existingUser: isExistingUser,
      newUser: !isExistingUser,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ success: false, message: "Server error during user lookup" });
  }
});

// ✅ Send OTP to phone
app.post("/send-phone-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone || typeof phone !== "string" || !/^\+\d{10,15}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Invalid phone number" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = Date.now() + 2 * 60 * 1000;

  otpStore[phone] = { otp, expiresAt };
  console.log(`Generated OTP ${otp} for ${phone}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

  res.status(200).json({ success: true });
});

// ✅ Verify phone OTP
app.post("/verify-phone-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Missing phone or OTP" });
  }

  const record = otpStore[phone];
  console.log("Verifying phone:", phone);
  console.log("Received OTP:", otp);
  console.log("Stored record:", record);

  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP found for this phone number" });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp.toString().trim() !== otp.toString().trim()) {
    return res.status(400).json({ success: false, message: "Incorrect OTP" });
  }

  delete otpStore[phone];
  console.log(`✅ Phone OTP verified for ${phone}`);
  res.status(200).json({ success: true });
});

// ✅ Serve frontend for all routes (React Router fallback)
app.use(express.static(path.join(__dirname, "dist"))); // Adjust if using Vite or CRA

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html")); // Ensure this path matches your build output
});

// ✅ Start server
app.listen(5000, () => {
  console.log("Server running on port 5000");
});
