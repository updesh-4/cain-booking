// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function SuccessRedirect() {
//   const navigate = useNavigate();
//   const [countdown, setCountdown] = useState(3);

//   useEffect(() => {
//   const countdownTimer = setInterval(() => {
//     setCountdown((prev) => prev - 1);
//   }, 1000);

//   const redirectTimer = setTimeout(() => {
//     localStorage.setItem("otpSuccessFlag", "true"); // ✅ Trigger storage event
//     window.close(); // ✅ Close this tab
//   }, 3000);

//   return () => {
//     clearInterval(countdownTimer);
//     clearTimeout(redirectTimer);
//   };
// }, []);


//   return (
//     <div className="min-h-screen bg-gray-100 flex items-center justify-center">
//       <div className="bg-white w-[400px] rounded-lg shadow-lg px-8 py-6 text-center">
//         <h2 className="text-2xl font-semibold mb-2">Success ✅</h2>
//         <p className="text-gray-700 mb-4">
//           You have successfully logged in, you can close this window now. <br />
//           Please navigate back to WeWork India. This page will close automatically in <strong>{countdown}</strong> second{countdown !== 1 && "s"}.
//         </p>
//         <div className="text-sm text-gray-500">wework</div>
//       </div>
//     </div>
//   );
// }
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function SuccessRedirect() {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3);

  useEffect(() => {
    // ✅ Set login state immediately when this component loads
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("otpSuccessFlag", "true");
    
    // ✅ Dispatch storage event to notify other tabs/windows
    window.dispatchEvent(new Event("storage"));
    
    const countdownTimer = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);

    const redirectTimer = setTimeout(() => {
      // ✅ Ensure login state is set before closing
      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("otpSuccessFlag", "true");
      
      // ✅ Try to close the window, if it fails, redirect to main page
      try {
        window.close();
      } catch (error) {
        // If window.close() fails (some browsers prevent it), redirect instead
        window.location.href = "/";
      }
    }, 3000);

    return () => {
      clearInterval(countdownTimer);
      clearTimeout(redirectTimer);
    };
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white w-[400px] rounded-lg shadow-lg px-8 py-6 text-center">
        <h2 className="text-2xl font-semibold mb-2">Success ✅</h2>
        <p className="text-gray-700 mb-4">
          You have successfully logged in! <br />
          Please navigate back to the main window. This page will close automatically in <strong>{countdown}</strong> second{countdown !== 1 && "s"}.
        </p>
        <div className="text-sm text-gray-500">POWERGRID India</div>
        
        {/* Manual close button as backup */}
        <button 
          onClick={() => {
            localStorage.setItem("isLoggedIn", "true");
            window.location.href = "/";
          }}
          className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          Continue to Main Page
        </button>
      </div>
    </div>
  );
}