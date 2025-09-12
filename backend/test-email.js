const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

transporter.sendMail({
  from: process.env.EMAIL_USER,
  to: "vidhichauhan7@gmail.com",
  subject: "Test Email from POWERGRID OTP Server",
  text: "This is a test email to confirm Gmail authentication.",
}, (err, info) => {
  if (err) {
    console.error("❌ Failed to send:", err);
  } else {
    console.log("✅ Email sent:", info.response);
  }
});
