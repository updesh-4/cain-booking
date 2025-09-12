import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Logo from "../../assets/logo.jpg";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleGetOtp = async () => {
    console.log("Sending OTP request for:", email); // ✅ Added log

    try {
      const response = await axios.post("http://localhost:5000/send-otp", {
        email,
      });

      if (response.data.success) {
        // Navigate to OTP verification page with email and OTP
        navigate("/verify-otp", {
          state: { email, otp: response.data.otp },
        });
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      {/* Login Box */}
      <div className="bg-white w-[400px] rounded-lg shadow-lg px-8 py-6 flex flex-col justify-start">
        <h2 className="text-2xl font-bold mb-3 text-left">Log in</h2>
        <p className="text-gray-700 font-medium mb-5 text-left">
          Enter your email to access your POWERGRID account.
        </p>

        <input
          type="email"
          placeholder="you@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md mb-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <p className="text-xs text-gray-500 mb-4 text-left">
          Your email will be used to send a secure OTP for verification.
        </p>

        <button
          disabled={!email}
          onClick={handleGetOtp}
          className={`w-full py-2 rounded-md transition duration-200 ${
            email
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Get OTP
        </button>
      </div>

      {/* Logo */}
      <div className="mt-4">
        <img src={Logo} alt="POWERGRID Logo" className="h-6" />
      </div>
    </div>
  );
}
