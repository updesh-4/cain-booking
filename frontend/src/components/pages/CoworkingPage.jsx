import React from 'react';
import { useParams, Link } from 'react-router-dom';


const CoworkingPage = () => {
  const { city } = useParams();

  // Function to dynamically get the image path
  const getImagePath = (cityName) => {
    // Correcting for the different file extensions
    const fileExtension = {
      'Delhi': 'jpg',
      'Haryana': 'jpg',
      'Karnataka': 'jpg',
      'Maharashtra': 'jpg',
      'Punjab': 'jpg',
    };
    const extension = fileExtension[cityName] || 'jpg';
    return `/src/assets/Pg${cityName}.${extension}`;
  };

  const backgroundImage = getImagePath(city);

  return (
    <div className="pt-20">
      {/* Breadcrumb Navigation - Adjust styling as needed */}
      <div className="flex items-center space-x-2 px-10 py-4 text-gray-500 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <span>&gt;</span>
        <span>...</span>
        <span>&gt;</span>
        <a href={`/coworking/${city}`} className="hover:underline">Co Working Space</a>
        <span>&gt;</span>
        <span className="text-gray-900">{city}</span>
      </div>

      {/* Hero Section Container */}
      <div className="relative w-full h-[500px] bg-white overflow-hidden">
        {/* Background Image - positioned to fill the right side and slightly extend left */}
        <div className="absolute top-0 right-0 h-full w-[75%]">
          <img
            src={backgroundImage}
            alt={`Coworking Space in ${city}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content Box - positioned absolutely to overlap the image */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-10 rounded-lg w-[450px] z-10">
          <h1 className="text-4xl font-normal mb-4">Book a coworking space in {city}</h1>
          <p className="text-lg font-light text-gray-700">
            Work from a productive workspace for the hour, the day, or the month with access to shared amenities, conference rooms, and more, across various powergrid branches.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CoworkingPage;