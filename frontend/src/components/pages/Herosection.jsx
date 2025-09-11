console.log("Hero component rendering...");

import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "./dropdown-menu";

const cities = ["Delhi", "Haryana", "Karnataka", "Maharashtra", "Punjab"];
const solutions = ["Office Spaces", "Coworking Spaces", "Private Office", "Event, Shoots and advertising"];

export default function Hero() {
  const [city, setCity] = useState("Select a city*");
  const [solution, setSolution] = useState("Choose a solution*");
  const navigate = useNavigate();

  const handleCitySelect = (selectedCity) => {
    setCity(selectedCity);
  };

  const handleSolutionSelect = (selectedSolution) => {
    setSolution(selectedSolution);
  };

   const handleExploreClick = () => {
  if (city !== "Select a city*" && solution !== "Choose a solution*") {
    const routeMap = {
      "Coworking Spaces": "coworking",
      "Office Spaces": "office-spaces",
      "Private Office": "private-office",
      "Event, Shoots and advertising": "events-shoots-and-advertising" // ✅ correct spelling
    };

    const path = routeMap[solution];
    if (path) {
      navigate(`/${path}/${city}`);
    } else {
      alert("Invalid solution selected.");
    }
  } else {
    alert("Please select a city and a solution.");
  }
};


  return (
    <section className="relative w-full h-screen flex flex-col items-center justify-end pb-16">
      {/* Background Video (or Image) */}
      <video
        className="absolute inset-0 w-full h-full object-cover z-0"
        autoPlay
        loop
        muted
        playsInline
      >
        <source src="videoplayback.mp4" type="video/mp4" />
        {/* You can add more <source> tags for different video formats for broader browser support */}
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-30 z-10"></div>

      {/* Main Content Box */}
      <div className="relative z-20 flex flex-col items-center justify-center bg-white bg-opacity-90 p-8 rounded-lg shadow-xl max-w-[900px]">
        <h1 className="text-xl md:text-2xl font-serif font-normal text-gray-800 mb-8 text-center whitespace-nowrap">
          Power-up your productivity. Book a POWERGRID workspace.
        </h1>

        {/* Search Bar */}
        <div className="flex items-center gap-4 w-full">
          {/* Select a City Dropdown */}
          <div className="relative flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-full px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 cursor-pointer flex justify-between items-center"
                >
                  <span className={city === "Select a city*" ? "text-gray-500" : "text-gray-700"}>
                    {city}
                  </span>
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 p-1 bg-white rounded-lg shadow-lg border border-gray-300 z-30">
                {cities.map((c) => (
                  <DropdownMenuItem
                    key={c}
                    onClick={() => handleCitySelect(c)}
                    className="cursor-pointer hover:bg-gray-100 border-2 border-transparent hover:border-gray-900 rounded-lg"
                  >
                    {c}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Choose a Solution Dropdown */}
          <div className="relative flex-1">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  className="w-full px-6 py-3 rounded-lg bg-white border border-gray-300 text-gray-700 cursor-pointer flex justify-between items-center"
                >
                  <span className={solution === "Choose a solution*" ? "text-gray-500" : "text-gray-700"}>
                    {solution}
                  </span>
                  <svg className="ml-2 h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 mt-2 p-1 bg-white rounded-lg shadow-lg border border-gray-300 z-30">
                {solutions.map((s) => (
                  <DropdownMenuItem
                    key={s}
                    onClick={() => handleSolutionSelect(s)}
                    className="cursor-pointer hover:bg-gray-100 border-2 border-transparent hover:border-gray-900 rounded-lg"
                  >
                    {s}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Explore Button */}
          <button
            onClick={handleExploreClick}
            className="bg-gray-700 text-white px-8 py-3 rounded-lg hover:bg-gray-800 focus:outline-none"
          >
            Explore
          </button>
        </div>
      </div>
    </section>
  );
}