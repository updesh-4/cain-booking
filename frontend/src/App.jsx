import React, { useEffect }  from 'react'
import './index.css';
import { Button } from "@/components/ui/button"
import FormData from "./components/pages/FormData";
import Footer from "./components/pages/footer"
import Navbar from './components/pages/Navbar'
import Hero from './components/pages/Herosection'
import CoworkingPage from './components/pages/CoworkingPage';
import OfficeSpacePage from './components/pages/OfficeSpacePage';
import EventsPage from './components/pages/EventsPage';
import PrivateOfficePage from './components/pages/PrivateOfficePage';
import CityDetailPage from './components/pages/CityDetailPage';
import AboutUsPage from './components/pages/AboutUsPage';
import BookSlot from './components/pages/BookSlot';
import Dashboard from './components/pages/Dashboard';
import LoginPage from './components/pages/LoginPage';
import OtpVerificationPage from './components/pages/OtpVerificationPage';
import SuccessRedirect from "./components/pages/SuccessRedirect";
import NewUserPhoneEntry from './components/pages/NewUserPhoneEntry';
import VerifyPhoneOtp from './components/pages/VerifyPhoneOtp';
import { BrowserRouter as Router, Routes, Route,useLocation, useNavigate } from 'react-router-dom';
const AppContent = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const loginRoutes = [
  "/login",
  "/verify-otp",
  "/new-user",
  "/verify-phone",
  "/success-redirect"
];

const showNavbar = !loginRoutes.includes(location.pathname);


  useEffect(() => {
    const interval = setInterval(() => {
      const flag = localStorage.getItem("otpSuccessFlag");
      if (flag === "true") {
        localStorage.removeItem("otpSuccessFlag"); // Clean up
        navigate("/"); // ✅ Redirect to HeroSection
      }
    }, 1000); // Check every second

    return () => clearInterval(interval);
  }, [navigate]);
  return (
    <div className="font-sans">
      {showNavbar && <Navbar />}
      <Routes>
        <Route path="/" element={
            <>
              <Hero />
              <FormData />
              <Footer />
            </>
          } />
         <Route path="/coworking/:city" element={
            <>
              <CoworkingPage />
              <FormData />
              <Footer />
            </>
          } />
        <Route path="/office-spaces/:city" element={
            <>
              <OfficeSpacePage />
              <FormData />
              <Footer />
            </>
          } />
        <Route path="/events-shoots-and-advertising/:city" element={
            <>
              <EventsPage />
              <FormData />
              <Footer />
            </>
          } />
        <Route path="/private-office/:city" element={
            <>
              <PrivateOfficePage />
              <FormData />
              <Footer />
            </>
          } />
        <Route path="/centre/:city" element={
            <>
              <CityDetailPage />
              <FormData />
              <Footer />
            </>
          } />
        <Route path="/about-us" element={
            <>
              <AboutUsPage />
              <FormData />
              <Footer />
            </>
          } />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/verify-otp" element={<OtpVerificationPage />} />
        <Route path="/success-redirect" element={<SuccessRedirect />} />
        <Route path="/new-user" element={<NewUserPhoneEntry />} />
        <Route path="/verify-phone" element={<VerifyPhoneOtp />} />
        <Route path="/BookSlot" element={<BookSlot />} />
        <Route path="/Dashboard" element={<Dashboard/>}/>
        <Route path="/FormData" element={<FormData/>}/>
      </Routes>
    </div>
  );
}
const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
// const App = () => {
//   return (
//     <Router>
//       <div className="font-sans">
//         {/* Navbar remains outside since it's on every page */}
//         <Navbar />
//         <Routes>
//           {/* This route will render all three components */}
//           <Route path="/" element={
//             <>
//               <Hero />
//               <FormData />
//               <Footer />
//             </>
//           } />
//           {/* These routes will also get the FormData and Footer */}
//           <Route path="/coworking/:city" element={
//             <>
//               <CoworkingPage />
//               <FormData />
//               <Footer />
//             </>
//           } />
//           <Route path="/office-spaces/:city" element={
//             <>
//               <OfficeSpacePage />
//               <FormData />
//               <Footer />
//             </>
//           } />
//           <Route path="/events-shoots-and-advertising/:city" element={
//             <>
//               <EventsPage />
//               <FormData />
//               <Footer />
//             </>
//           } />
//           <Route path="/private-office/:city" element={
//             <>
//               <PrivateOfficePage />
//               <FormData />
//               <Footer />
//             </>
//           } />
//           <Route path="/centre/:city" element={
//             <>
//               <CityDetailPage />
//               <FormData />
//               <Footer />
//             </>
//           } />
//           <Route path="/about-us" element={
//             <>
//               <AboutUsPage />
//               <FormData />
//               <Footer />
//             </>
//           } />
          
//           {/* This route for BookSlot is separate and won't have the other components */}
//           <Route path="/BookSlot" element={<BookSlot />} />
//           <Route path="/Dashboard" element={<Dashboard/>}/>

//         </Routes>
//       </div>
//     </Router>
//   );
// }

// export default App;
