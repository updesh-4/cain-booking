// import React, { useState, useRef, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";
// import axios from "axios";

// export default function VerifyPhoneOtp() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const phone = location.state?.phone || "";

//   const [otp, setOtp] = useState(["", "", "", ""]);
//   const inputRefs = useRef([]);
//   const [resendTimer, setResendTimer] = useState(30);
//   const [canResend, setCanResend] = useState(false);

//   // Countdown logic
//   useEffect(() => {
//     if (resendTimer > 0) {
//       const timer = setTimeout(() => setResendTimer(resendTimer - 1), 1000);
//       return () => clearTimeout(timer);
//     } else {
//       setCanResend(true);
//     }
//   }, [resendTimer]);

//   const handleChange = (value, index) => {
//     if (!/^\d?$/.test(value)) return;

//     const newOtp = [...otp];
//     newOtp[index] = value;
//     setOtp(newOtp);

//     if (value && index < 3) {
//       inputRefs.current[index + 1]?.focus();
//     }
//   };

//   const handleSubmit = async () => {
//     const enteredOtp = otp.join("").trim();
//     console.log("Verifying phone:", phone, "OTP:", enteredOtp); // ✅ Debug log

//     try {
//       const response = await axios.post("http://localhost:5000/verify-phone-otp", {
//         phone,
//         otp: enteredOtp,
//       });

//       console.log("Phone OTP verification response:", response.data);

//       if (response.data.success) {
//         navigate("/success-redirect");
//       } else {
//         alert(response.data.message || "OTP verification failed");
//       }
//     } catch (error) {
//       console.error("Error verifying phone OTP:", error);
//       alert("Server error. Please try again.");
//     }
//   };

//   const handleResendOtp = async () => {
//     try {
//       const response = await axios.post("http://localhost:5000/send-phone-otp", {
//         phone,
//       });

//       if (response.data.success) {
//         setOtp(["", "", "", ""]);
//         setResendTimer(30);
//         setCanResend(false);
//         alert("OTP resent successfully");
//       }
//     } catch (error) {
//       console.error("Error resending phone OTP:", error);
//       alert("Failed to resend OTP. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
//       <div className="bg-white w-[400px] rounded-lg shadow-lg px-8 py-6">
//         <h2 className="text-xl font-bold mb-3 text-left">Verify your phone</h2>
//         <p className="text-gray-700 font-medium mb-6 text-left">
//           Please enter the 4-digit code sent to your phone number: <br />
//           <span className="font-semibold">{phone}</span>
//         </p>

//         <div className="flex space-x-4 mb-4">
//           {otp.map((digit, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength="1"
//               value={digit}
//               onChange={(e) => handleChange(e.target.value, index)}
//               ref={(el) => (inputRefs.current[index] = el)}
//               className="w-10 h-10 text-center border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
//             />
//           ))}
//         </div>

//         <button
//           onClick={handleSubmit}
//           disabled={otp.some((digit) => digit === "")}
//           className={`w-full py-2 rounded-md transition duration-200 ${
//             otp.every((digit) => digit !== "")
//               ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
//               : "bg-gray-400 text-white cursor-not-allowed"
//           }`}
//         >
//           Submit
//         </button>

//         <button
//           disabled={!canResend}
//           onClick={handleResendOtp}
//           className={`w-full py-2 rounded-md mt-2 transition duration-200 ${
//             canResend
//               ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
//               : "bg-gray-400 text-white cursor-not-allowed"
//           }`}
//         >
//           Resend OTP {canResend ? "" : `in ${resendTimer}s`}
//         </button>
//       </div>

//       <div className="mt-4">
//         <img src="/image.png" alt="POWERGRID Logo" className="h-6" />
//       </div>
//     </div>
//   );
// }
import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";

export default function VerifyPhoneOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const phone = location.state?.phone || "";

  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = useRef([]);
  const [resendTimer, setResendTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

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

    // Clear error when user starts typing
    if (error) setError("");

    if (value && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("").trim();
    console.log("Verifying phone:", phone, "OTP:", enteredOtp);

    if (enteredOtp.length !== 4) {
      setError("Please enter all 4 digits");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // ✅ Fixed: Use the correct API endpoint
      const response = await axios.post("http://localhost:5000/api/verify-phone-otp", {
        phone: phone.trim(),
        otp: enteredOtp,
      });

      console.log("Phone OTP verification response:", response.data);

      if (response.data.success) {
        // ✅ Set login state immediately after successful verification
        localStorage.setItem("isLoggedIn", "true");
        navigate("/success-redirect");
      } else {
        setError(response.data.message || "OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying phone OTP:", error);
      
      if (error.response) {
        setError(error.response.data?.message || "Invalid OTP. Please try again.");
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleResendOtp = async () => {
    console.log("Resending OTP to phone:", phone);
    setError("");

    try {
      // ✅ Fixed: Use the correct API endpoint
      const response = await axios.post("http://localhost:5000/api/send-phone-otp", {
        phone: phone.trim(),
      });

      if (response.data.success) {
        setOtp(["", "", "", ""]);
        setResendTimer(30);
        setCanResend(false);
        // Focus on first input
        inputRefs.current[0]?.focus();
        alert("OTP resent successfully");
      } else {
        setError("Failed to resend OTP. Please try again.");
      }
    } catch (error) {
      console.error("Error resending phone OTP:", error);
      setError("Failed to resend OTP. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="bg-white w-[400px] rounded-lg shadow-lg px-8 py-6">
        <h2 className="text-xl font-bold mb-3 text-left">Verify your phone</h2>
        <p className="text-gray-700 font-medium mb-6 text-left">
          Please enter the 4-digit code sent to your phone number: <br />
          <span className="font-semibold">{phone}</span>
        </p>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            {error}
          </div>
        )}

        <div className="flex space-x-4 mb-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(e.target.value, index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
              ref={(el) => (inputRefs.current[index] = el)}
              className={`w-12 h-12 text-center border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg ${
                error ? 'border-red-300' : 'border-gray-300'
              }`}
              disabled={isLoading}
            />
          ))}
        </div>

        <button
          onClick={handleSubmit}
          disabled={otp.some((digit) => digit === "") || isLoading}
          className={`w-full py-3 rounded-md transition duration-200 font-medium ${
            otp.every((digit) => digit !== "") && !isLoading
              ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {isLoading ? "Verifying..." : "Submit"}
        </button>

        <button
          disabled={!canResend || isLoading}
          onClick={handleResendOtp}
          className={`w-full py-3 rounded-md mt-3 transition duration-200 font-medium ${
            canResend && !isLoading
              ? "bg-gray-600 hover:bg-gray-700 text-white cursor-pointer"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          {isLoading ? "Sending..." : `Resend OTP ${canResend ? "" : `in ${resendTimer}s`}`}
        </button>
      </div>

      <div className="mt-4">
        <img src="/image.png" alt="POWERGRID Logo" className="h-6" />
      </div>
    </div>
  );
}