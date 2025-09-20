const express = require("express");
const router = express.Router();
const {
  sendEmailOtp,
  verifyEmailOtp,
  sendPhoneOtp,
  verifyPhoneOtp,
} = require("../controllers/authController");

router.post("/send-otp", sendEmailOtp);
router.post("/verify-otp", verifyEmailOtp);
router.post("/send-phone-otp", sendPhoneOtp);
router.post("/verify-phone-otp", verifyPhoneOtp);

module.exports = router;  
