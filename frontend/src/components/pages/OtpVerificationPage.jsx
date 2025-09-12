import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function OtpVerificationPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);

  // Countdown logic
  useEffect(() => {
    if (resendTimer > 0) {
      const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [resendTimer]);

  const handleChange = (value, index) => {
    if (!/^\d?$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");

    try {
        const response = await axios.post("http://localhost:5000/verify-otp", {
        email,
        otp: enteredOtp,
      });
       console.log("OTP verification response:", response.data);
      if (response.data.success) {
        if (response.data.existingUser) {
          navigate("/success-redirect");
        } else {
          navigate("/new-user");
        }
      } else {
        alert(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("Server error. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });

      if (response.data.success) {
        setOtp(["", "", "", ""]);
        setResendTimer(30);
        setCanResend(false);
        alert("OTP resent successfully");
      }
    } catch (error) {
      console.error("Error resending OTP:", error);
      alert("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white w-[400px] rounded-lg shadow-lg px-8 py-6">
        <h2 className="text-xl font-bold mb-3 text-left">Enter verification code</h2>
        <p className="text-gray-700 font-medium mb-6 text-left">
          Please enter the 4-digit code sent to your email: <br />
          <span className="font-semibold">{email}</span>
        </p>

        <div className="flex space-x-4 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={otp.some((digit) => digit === "")}
          className={`w-full py-2 rounded-md transition duration-200 ${
            otp.every((digit) => digit !== "")
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Submit
        </button>

        <button
          disabled={!canResend}
          onClick={handleResendOtp}
          className={`w-full py-2 rounded-md mt-2 transition duration-200 ${
            canResend
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Resend OTP {canResend ? "" : `in ${resendTimer}s`}
        </button>
      </div>

      <div className="mt-4">
        <img src="/image.png" alt="POWERGRID Logo" className="h-6" />
      </div>
    </div>
  );
}
