// // // import React, { useState } from "react";
// // // import { useNavigate } from "react-router-dom";
// // // import PhoneInput from "react-phone-input-2";
// // // import 'react-phone-input-2/lib/style.css';
// // // import axios from "axios";

// // // export default function NewUserPhoneEntry() {
// // //   const [phone, setPhone] = useState("");
// // //   const navigate = useNavigate();

// // //   const handleSendOtp = async () => {
// // //   try {
// // //     const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
// // //     console.log("Sending phone:", formattedPhone);

// // //     const response = await axios.post("http://localhost:5000/send-phone-otp", {
// // //       phone: formattedPhone,
// // //     });

// // //     if (response.data.success) {
// // //       navigate("/verify-phone", { state: { phone: formattedPhone } });
// // //     } else {
// // //       alert(response.data.message || "Failed to send OTP");
// // //     }
// // //   } catch (error) {
// // //     console.error("Error sending phone OTP:", error.response?.data || error.message);
// // //     alert("Server error. Please try again.");
// // //   }
// // // };

// // //   return (
// // //     <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
// // //       {/* White box */}
// // //       <div className="bg-white w-full max-w-md rounded-lg px-6 py-8 shadow-md">
// // //         <h1 className="text-2xl font-serif font-semibold mb-4">First time?</h1>
// // //         <p className="text-sm text-gray-700 mb-6">
// // //           Please add your phone number to your WeWork account
// // //         </p>

// // //         <label className="block text-sm font-semibold text-black mb-2">
// // //           Phone number
// // //         </label>

// // //         <PhoneInput
// // //           country={'in'}
// // //           value={phone}
// // //           onChange={setPhone}
// // //           inputClass="!w-full !text-sm !px-4 !py-2 !border !border-blue-500 !rounded-md !outline-none"
// // //           containerClass="mb-6"
// // //           enableSearch
// // //         />

// // //         <p className="text-sm text-gray-500 mb-6">
// // //           Don't worry, your information is safe with us.
// // //         </p>

// // //         <button
// // //           onClick={handleSendOtp}
// // //           className="bg-black text-white font-semibold px-4 py-2 rounded w-full"
// // //         >
// // //           Get OTP
// // //         </button>
// // //       </div>

// // //       {/* Logo outside the box */}
// // //       <div className="mt-6 text-black font-serif text-sm text-center">wework</div>
// // //     </div>
// // //   );
// // // }
// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import PhoneInput from "react-phone-input-2";
// // import 'react-phone-input-2/lib/style.css';
// // import axios from "axios";

// // export default function NewUserPhoneEntry() {
// //   const [phone, setPhone] = useState("");
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [error, setError] = useState("");
// //   const navigate = useNavigate();

// //   const handleSendOtp = async () => {
// //     if (!phone || phone.length < 10) {
// //       setError("Please enter a valid phone number");
// //       return;
// //     }

// //     setIsLoading(true);
// //     setError("");

// //     try {
// //       const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
// //       console.log("Sending phone:", formattedPhone);

// //       // ✅ Fixed: Add /api prefix to the endpoint
// //       const response = await axios.post("http://localhost:5000/api/send-phone-otp", {
// //         phone: formattedPhone,
// //       });

// //       console.log("Phone OTP response:", response.data);

// //       if (response.data.success) {
// //         navigate("/verify-phone", { state: { phone: formattedPhone } });
// //       } else {
// //         setError(response.data.message || "Failed to send OTP");
// //       }
// //     } catch (error) {
// //       console.error("Error sending phone OTP:", error);
      
// //       if (error.response) {
// //         setError(error.response.data?.message || "Failed to send OTP. Please try again.");
// //       } else if (error.request) {
// //         setError("Network error. Please check your connection.");
// //       } else {
// //         setError("An unexpected error occurred. Please try again.");
// //       }
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   return (
// //     <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
// //       {/* White box */}
// //       <div className="bg-white w-full max-w-md rounded-lg px-6 py-8 shadow-md">
// //         <h1 className="text-2xl font-serif font-semibold mb-4">First time?</h1>
// //         <p className="text-sm text-gray-700 mb-6">
// //           Please add your phone number to your WeWork account
// //         </p>

// //         <label className="block text-sm font-semibold text-black mb-2">
// //           Phone number
// //         </label>

// //         <PhoneInput
// //           country={'in'}
// //           value={phone}
// //           onChange={setPhone}
// //           inputClass="!w-full !text-sm !px-4 !py-2 !border !border-blue-500 !rounded-md !outline-none"
// //           containerClass="mb-4"
// //           enableSearch
// //           disabled={isLoading}
// //         />

// //         {error && (
// //           <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
// //             {error}
// //           </div>
// //         )}

// //         <p className="text-sm text-gray-500 mb-6">
// //           Don't worry, your information is safe with us.
// //         </p>

// //         <button
// //           onClick={handleSendOtp}
// //           disabled={isLoading || !phone}
// //           className={`font-semibold px-4 py-2 rounded w-full transition duration-200 ${
// //             isLoading || !phone
// //               ? "bg-gray-400 text-white cursor-not-allowed"
// //               : "bg-black hover:bg-gray-800 text-white"
// //           }`}
// //         >
// //           {isLoading ? "Sending..." : "Get OTP"}
// //         </button>
// //       </div>

// //       {/* Logo outside the box */}
// //       <div className="mt-6 text-black font-serif text-sm text-center">wework</div>
// //     </div>
// //   );
// // }

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import PhoneInput from "react-phone-input-2";
// import 'react-phone-input-2/lib/style.css';
// import axios from "axios";

// export default function NewUserPhoneEntry() {
//   const [phone, setPhone] = useState("");
//   const navigate = useNavigate();

//   const handleSendOtp = async () => {
//   try {
//     const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
//     console.log("Sending phone:", formattedPhone);

//     const response = await axios.post("http://localhost:5000/api/send-phone-otp", {
//       phone: formattedPhone,
//     });

//     if (response.data.success) {
//       navigate("/verify-phone", { state: { phone: formattedPhone } });
//     } else {
//       alert(response.data.message || "Failed to send OTP");
//     }
//   } catch (error) {
//     console.error("Error sending phone OTP:", error.response?.data || error.message);
//     alert("Server error. Please try again.");
//   }
// };

//   return (
//     <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
//       {/* White box */}
//       <div className="bg-white w-full max-w-md rounded-lg px-6 py-8 shadow-md">
//         <h1 className="text-2xl font-serif font-semibold mb-4">First time?</h1>
//         <p className="text-sm text-gray-700 mb-6">
//           Please add your phone number to your WeWork account
//         </p>

//         <label className="block text-sm font-semibold text-black mb-2">
//           Phone number
//         </label>

//         <PhoneInput
//           country={'in'}
//           value={phone}
//           onChange={setPhone}
//           inputClass="!w-full !text-sm !px-4 !py-2 !border !border-blue-500 !rounded-md !outline-none"
//           containerClass="mb-6"
//           enableSearch
//         />

//         <p className="text-sm text-gray-500 mb-6">
//           Don't worry, your information is safe with us.
//         </p>

//         <button
//           onClick={handleSendOtp}
//           className="bg-black text-white font-semibold px-4 py-2 rounded w-full"
//         >
//           Get OTP
//         </button>
//       </div>

//       {/* Logo outside the box */}
//       <div className="mt-6 text-black font-serif text-sm text-center">wework</div>
//     </div>
//   );
// }

import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import PhoneInput from "react-phone-input-2";
import 'react-phone-input-2/lib/style.css';
import axios from "axios";

export default function NewUserPhoneEntry() {
  const [phone, setPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSendOtp = async () => {
    if (!phone || phone.length < 10) {
      setError("Please enter a valid phone number");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const formattedPhone = phone.startsWith("+") ? phone : `+${phone}`;
      console.log("Sending phone:", formattedPhone);

      // ✅ Store intended redirect path before continuing
      localStorage.setItem("postLoginRedirect", location.state?.from?.pathname || "/");

      const response = await axios.post("http://localhost:5000/api/send-phone-otp", {
        phone: formattedPhone,
      });

      console.log("Phone OTP response:", response.data);

      if (response.data.success) {
        navigate("/verify-phone", { state: { phone: formattedPhone } });
      } else {
        setError(response.data.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending phone OTP:", error);

      if (error.response) {
        setError(error.response.data?.message || "Failed to send OTP. Please try again.");
      } else if (error.request) {
        setError("Network error. Please check your connection.");
      } else {
        setError("An unexpected error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* White box */}
      <div className="bg-white w-full max-w-md rounded-lg px-6 py-8 shadow-md">
        <h1 className="text-2xl font-serif font-semibold mb-4">First time?</h1>
        <p className="text-sm text-gray-700 mb-6">
          Please add your phone number to your WeWork account
        </p>

        <label className="block text-sm font-semibold text-black mb-2">
          Phone number
        </label>

        <PhoneInput
          country={'in'}
          value={phone}
          onChange={setPhone}
          inputClass="!w-full !text-sm !px-4 !py-2 !border !border-blue-500 !rounded-md !outline-none"
          containerClass="mb-4"
          enableSearch
          disabled={isLoading}
        />

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
            {error}
          </div>
        )}

        <p className="text-sm text-gray-500 mb-6">
          Don't worry, your information is safe with us.
        </p>

        <button
          onClick={handleSendOtp}
          disabled={isLoading || !phone}
          className={`font-semibold px-4 py-2 rounded w-full transition duration-200 ${
            isLoading || !phone
              ? "bg-gray-400 text-white cursor-not-allowed"
              : "bg-black hover:bg-gray-800 text-white"
          }`}
        >
          {isLoading ? "Sending..." : "Get OTP"}
        </button>
      </div>

      {/* Logo outside the box */}
      <div className="mt-6 text-black font-serif text-sm text-center">wework</div>
    </div>
  );
}