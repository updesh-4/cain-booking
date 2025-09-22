// import React, { useState } from "react";
// import { Link } from 'react-router-dom';
// import { Button } from "./button";
// import { useNavigate } from 'react-router-dom';
// import FormData from "./FormData";
// import Logo from "../../assets/logo.jpg";


// const centersData = {
//   Delhi: ["New Delhi"],
//   Haryana: ["Faridabad", "Gurugram"],
//   Karnataka: ["Bengaluru", "Yelahanka"],
//   Maharashtra: ["Nagpur", "Mumbai"],
//   Punjab: ["Amritsar", "Jalandhar", "Ludhiana"],
// };

// export default function Navbar() {
//   const [hoveredState, setHoveredState] = useState(null);
//   const cities = hoveredState ? centersData[hoveredState] : [];
//   const navigate = useNavigate();

//  const handleClick = () => {
//     navigate("/FormData"); 
//   };
//   return (
//     <nav className="flex items-center space-x-6 px-8 py-4 shadow-md bg-white fixed top-0 left-0 right-0 z-50">
//       {/* Logo */}
//        <Link to="/">
//   <img src={Logo} alt="Power Grid Logo" className="h-10 w-40 cursor-pointer" />
// </Link>

//       {/* Nav Links */}
//       <ul className="hidden md:flex space-x-6 text-gray-900 font-medium">
//         <li>
//   <Link to="/about-us" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4">
//     About us
//   </Link>
// </li>
//         <li className="relative group">
//            <a href="#" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
//             Centres
//               <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </a>
//           {/* The Dropdown Menu */}
//           <div 
//             className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block bg-white shadow-lg rounded-md w-[500px]"
//             onMouseLeave={() => setHoveredState(null)}
//           >
//             <div className="flex justify-between p-6">
//               {/* Left Column */}
//               <div className="flex-1 border-r border-gray-300 pr-6"> {/* Added border-r, border-gray-300, and pr-6 */}
//                 <ul className="space-y-2">
//                   {Object.keys(centersData).map((state) => (
//                     <li 
//                       key={state}
//                       onMouseEnter={() => setHoveredState(state)}
//                     >
//                       <a 
//                         href="#" 
//                         className={`font-bold hover:text-blue-600 ${hoveredState === state ? 'text-blue-600' : 'text-gray-900'}`}
//                       >
//                         {state}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               {/* Right Column - Cities */}
//               <div className="flex-1 pl-6">
//                 <ul className="space-y-2">
//                   {hoveredState &&
//                     centersData[hoveredState].map((city, index) => (
//                       <li key={index}>
//                         <Link to={`/centre/${city}`} className="hover:text-blue-600">{city}</Link>
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </li>
//         {/* <li><a href="#">Workspaces</a></li> */}
//         {/* <li><a href="#">Enterprise</a></li> */}
//         {/* <li><a href="#">Investor Relations</a></li> */}
//         {/* <li><a href="#">Referrals</a></li> */}
//       </ul>
//       <Link to="/BookSlot"  className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center" >Book a Slot</Link>
//       <Link to="/Dashboard"  className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center" >Dashboard</Link>

//        <div className="flex-grow"></div>
      
//       {/* Right Section */}
//       <div className="flex items-center space-x-4 text-gray-900">
//          <span className="flex items-center">
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-[2px]" viewBox="0 0 20 20" fill="currentColor">
//                 <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.96 18 3 13.04 3 7V5z" />
//             </svg>
//              <a href="tel:180012377888" className="flex items-center text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4">
//   180012377888
// </a>
//         </span>
//        <button
//         onClick={() => window.open("/login", "_blank", "width=600,height=700")}
//         className="bg-blue-600 text-white px-4 py-2 rounded-md"
//         >
//           Log in
//         </button>
//        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg" onClick={handleClick}>Get in touch</Button>
//       </div>
//     </nav>
//   );
// }
// import React, { useState, useEffect, useRef } from "react";
// import { Link, useNavigate } from 'react-router-dom';
// import { Button } from "./button";
// import FormData from "./FormData";
// import profileIcon from "../../assets/profile.png"
// import Logo from "../../assets/logo.jpg";

// const centersData = {
//   Delhi: ["New Delhi"],
//   Haryana: ["Faridabad", "Gurugram"],
//   Karnataka: ["Bengaluru", "Yelahanka"],
//   Maharashtra: ["Nagpur", "Mumbai"],
//   Punjab: ["Amritsar", "Jalandhar", "Ludhiana"],
// };

// export default function Navbar() {
//   const [hoveredState, setHoveredState] = useState(null);
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [showDropdown, setShowDropdown] = useState(false);
//   const navigate = useNavigate();
//   const cities = hoveredState ? centersData[hoveredState] : [];
//   const timeoutRef = useRef(null);

// const handleClick = () => {
//     navigate("/FormData");
//   };

//   // Sync login state from localStorage
//   useEffect(() => {
//     const checkLogin = () => {
//       const flag = localStorage.getItem("isLoggedIn") === "true";
//       setIsLoggedIn(flag);
//     };

//     checkLogin();
//     window.addEventListener("storage", checkLogin);
//     return () => window.removeEventListener("storage", checkLogin);
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     setShowDropdown(false);
//     setIsLoggedIn(false);
//     window.location.reload();
//   };

//   const handleMouseEnter = () => {
//     clearTimeout(timeoutRef.current);
//     setShowDropdown(true);
//   };

//   const handleMouseLeave = () => {
//     timeoutRef.current = setTimeout(() => {
//       setShowDropdown(false);
//     }, 150); // 150ms delay
//   };

//   return (
//     <nav className="flex items-center space-x-6 px-8 py-4 shadow-md bg-white fixed top-0 left-0 right-0 z-50">
//       {/* Logo */}
//       <Link to="/">
//         <img src={Logo} alt="Power Grid Logo" className="h-10 w-40 cursor-pointer" />
//       </Link>

//       {/* Nav Links */}
//       <ul className="hidden md:flex space-x-6 text-gray-900 font-medium">
//         <li>
//           <Link to="/about-us" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4">
//             About us
//           </Link>
//         </li>
//         <li className="relative group">
//           <a href="#" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
//             Centres
//             <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
//               <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
//             </svg>
//           </a>
//           {/* Dropdown Menu */}
//           <div 
//             className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block bg-white shadow-lg rounded-md w-[500px]"
//             onMouseLeave={() => setHoveredState(null)}
//           >
//             <div className="flex justify-between p-6">
//               <div className="flex-1 border-r border-gray-300 pr-6">
//                 <ul className="space-y-2">
//                   {Object.keys(centersData).map((state) => (
//                     <li key={state} onMouseEnter={() => setHoveredState(state)}>
//                       <a href="#" className={`font-bold hover:text-blue-600 ${hoveredState === state ? 'text-blue-600' : 'text-gray-900'}`}>
//                         {state}
//                       </a>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//               <div className="flex-1 pl-6">
//                 <ul className="space-y-2">
//                   {hoveredState &&
//                     cities.map((city, index) => (
//                       <li key={index}>
//                         <Link to={`/centre/${city}`} className="hover:text-blue-600">{city}</Link>
//                       </li>
//                     ))}
//                 </ul>
//               </div>
//             </div>
//           </div>
//         </li>
//       </ul>

//  {isLoggedIn && (
//   <>
//     <Link to="/BookSlot" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
//       Book a Slot
//     </Link>
//     <Link to="/Dashboard" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
//       Dashboard
//     </Link>
//   </>
// )}

//       <div className="flex-grow"></div>

//       {/* Right Section */}
//       <div className="flex items-center space-x-4 text-gray-900">
//         <span className="flex items-center">
//           <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-[2px]" viewBox="0 0 20 20" fill="currentColor">
//             <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.96 18 3 13.04 3 7V5z" />
//           </svg>
//           <a href="tel:180012377888" className="flex items-center text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4">
//             180012377888
//           </a>
//         </span>

//         {!isLoggedIn ? (
//           <Link
//             to="/login"
//             target="_blank"
//             className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4"
//           >
//             Log in
//           </Link>
//         ) : (
//           <div
//             className="relative"
//             onMouseEnter={handleMouseEnter}
//             onMouseLeave={handleMouseLeave}
//           >
//             {/* Profile Icon */}
//             <img
//               src={profileIcon}
//               alt="Profile"
//               className="h-8 w-8 rounded-full border border-gray-300 cursor-pointer"
//               onError={(e) => {
//                 e.target.onerror = null;
//                 e.target.src = "https://via.placeholder.com/32";
//               }}
//             />

//             {/* Dropdown */}
//             {showDropdown && (
//               <div
//                 className="absolute top-full left-1/2 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 transform -translate-x-1/2"
//               >
//                 <div
//                   onClick={handleLogout}
//                   className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
//                 >
//                   Log out
//                 </div>
//               </div>
//             )}
//           </div>
//         )}

//         <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg" onClick={handleClick}>
//           Get in touch
//         </Button>

//       </div>
//     </nav>
//   );
// }
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from 'react-router-dom';
import { Button } from "./button";
import FormData from "./FormData";
import profileIcon from "../../assets/profile.png"
import Logo from "../../assets/logo.jpg";

const centersData = {
  Delhi: ["New Delhi"],
  Haryana: ["Faridabad", "Gurugram"],
  Karnataka: ["Bengaluru", "Yelahanka"],
  Maharashtra: ["Nagpur", "Mumbai"],
  Punjab: ["Amritsar", "Jalandhar", "Ludhiana"],
};

export default function Navbar() {
  const [hoveredState, setHoveredState] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  const cities = hoveredState ? centersData[hoveredState] : [];
  const timeoutRef = useRef(null);

  const handleClick = () => {
    navigate("/FormData");
  };

  // ✅ Enhanced login state management
  useEffect(() => {
    const checkLogin = () => {
      const loginFlag = localStorage.getItem("isLoggedIn") === "true";
      const otpSuccessFlag = localStorage.getItem("otpSuccessFlag") === "true";
      
      // ✅ Consider user logged in if either flag is true
      const userLoggedIn = loginFlag || otpSuccessFlag;
      
      console.log("Login state check:", { loginFlag, otpSuccessFlag, userLoggedIn });
      setIsLoggedIn(userLoggedIn);
      
      // ✅ Sync the flags if needed
      if (userLoggedIn) {
        localStorage.setItem("isLoggedIn", "true");
      }
    };

    // ✅ Check immediately on mount
    checkLogin();

    // ✅ Listen for storage events (from other tabs)
    const handleStorageChange = (e) => {
      if (e.key === "isLoggedIn" || e.key === "otpSuccessFlag") {
        checkLogin();
      }
    };

    // ✅ Listen for custom events (from same tab)
    const handleCustomStorageEvent = () => {
      checkLogin();
    };

    window.addEventListener("storage", handleStorageChange);
    window.addEventListener("storage", handleCustomStorageEvent);
    
    // ✅ Also check periodically in case events are missed
    const intervalId = setInterval(checkLogin, 30000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      window.removeEventListener("storage", handleCustomStorageEvent);
      clearInterval(intervalId);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("otpSuccessFlag");
    setShowDropdown(false);
    setIsLoggedIn(false);
    
    // ✅ Dispatch storage event to notify other components
    window.dispatchEvent(new Event("storage"));
    
    // Optional: redirect to home page
    navigate("/");
  };

  const handleMouseEnter = () => {
    clearTimeout(timeoutRef.current);
    setShowDropdown(true);
  };

  const handleMouseLeave = () => {
    timeoutRef.current = setTimeout(() => {
      setShowDropdown(false);
    }, 150);
  };

  return (
    <nav className="flex items-center space-x-6 px-8 py-4 shadow-md bg-white fixed top-0 left-0 right-0 z-50">
      {/* Logo */}
      <Link to="/">
        <img src={Logo} alt="Power Grid Logo" className="h-10 w-40 cursor-pointer" />
      </Link>

      {/* Nav Links */}
      <ul className="hidden md:flex space-x-6 text-gray-900 font-medium">
        <li>
          <Link to="/about-us" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4">
            About us
          </Link>
        </li>
        <li className="relative group">
          <a href="#" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
            Centres
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-1 transition-transform duration-200 group-hover:rotate-180" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </a>
          {/* Dropdown Menu */}
          <div 
            className="absolute top-full left-1/2 -translate-x-1/2 pt-4 hidden group-hover:block bg-white shadow-lg rounded-md w-[500px]"
            onMouseLeave={() => setHoveredState(null)}
          >
            <div className="flex justify-between p-6">
              <div className="flex-1 border-r border-gray-300 pr-6">
                <ul className="space-y-2">
                  {Object.keys(centersData).map((state) => (
                    <li key={state} onMouseEnter={() => setHoveredState(state)}>
                      <a href="#" className={`font-bold hover:text-blue-600 ${hoveredState === state ? 'text-blue-600' : 'text-gray-900'}`}>
                        {state}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex-1 pl-6">
                <ul className="space-y-2">
                  {hoveredState &&
                    cities.map((city, index) => (
                      <li key={index}>
                        <Link to={`/centre/${city}`} className="hover:text-blue-600">{city}</Link>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </div>
        </li>
      </ul>

      {/* ✅ Conditional rendering with debug info */}
      {isLoggedIn && (
        <>
          <Link to="/BookSlot" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
            Book a Slot
          </Link>
          <Link to="/Dashboard" className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4 flex items-center">
            Dashboard
          </Link>
        </>
      )}

      <div className="flex-grow"></div>

      {/* Right Section */}
      <div className="flex items-center space-x-4 text-gray-900">
        <span className="flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-[2px]" viewBox="0 0 20 20" fill="currentColor">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.774a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.96 18 3 13.04 3 7V5z" />
          </svg>
          <a href="tel:180012377888" className="flex items-center text-sm font-medium hover:underline hover:decoration-2 hover:underline-offset-4">
            011-26560112
          </a>
        </span>

        {!isLoggedIn ? (
          <Link
            to="/login"
            target="_blank"
            className="font-medium hover:underline hover:decoration-2 hover:underline-offset-4"
          >
            Log in
          </Link>
        ) : (
          <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {/* Profile Icon */}
            <img
              src={profileIcon}
              alt="Profile"
              className="h-8 w-8 rounded-full border border-gray-300 cursor-pointer"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/32";
              }}
            />

            {/* Dropdown */}
            {showDropdown && (
              <div
                className="absolute top-full left-1/2 mt-2 w-36 bg-white border border-gray-200 rounded-md shadow-lg z-50 transform -translate-x-1/2"
              >
                <div
                  onClick={handleLogout}
                  className="px-4 py-2 text-sm text-gray-700 hover:text-blue-600 cursor-pointer transition-colors duration-200"
                >
                  Log out
                </div>
              </div>
            )}
          </div>
        )}

        <Button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-2 rounded-lg" onClick={handleClick}>
          Get in touch
        </Button>
      </div>

      {/* ✅ Debug info (remove in production) */}
        
    </nav>
  );
}