import React from 'react'
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
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';





const App = () => {
  return (
    <Router>
      <div className="font-sans">
        <Navbar />
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/coworking/:city" element={<CoworkingPage />} />
          <Route path="/office-spaces/:city" element={<OfficeSpacePage />} />
           <Route path="/events-shoots-and-advertising/:city" element={<EventsPage />} />
           <Route path="/private-office/:city" element={<PrivateOfficePage />} /> 
           <Route path="/centre/:city" element={<CityDetailPage />} />
           <Route path="/about-us" element={<AboutUsPage />} />
            

        </Routes>
        <FormData/>
        <Footer/>
      </div>
    </Router>
  )
}

export default App