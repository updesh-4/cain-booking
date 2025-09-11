import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Corrected import paths to match the file names exactly
import defaultPrivateofficeImage from '../../assets/Privateoffice.png';

const PrivateOfficePage = () => {
  const { city } = useParams();

  // The backgroundImage variable now always points to the default image
  const backgroundImage = defaultPrivateofficeImage;

return (
    <div className="pt-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 px-10 py-4 text-gray-500 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <span>&gt;</span>
        <span>...</span>
        <span>&gt;</span>
        <Link to={`/private-office/${city}`} className="hover:underline">Private Office</Link>
        <span>&gt;</span>
        <span className="text-gray-900">{city}</span>
      </div>

      {/* Hero Section Container */}
      <div className="relative w-full h-[500px] bg-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute top-0 right-0 h-full w-[75%]">
          <img
            src={backgroundImage}
            alt={`Private Office in ${city}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content Box with Button */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-10 rounded-lg w-[450px] z-10">
          <h1 className="text-4xl font-normal mb-4">A private and secure space for your business in {city}</h1>
          <p className="text-lg font-light text-gray-700 mb-6">
            Move-in to a private and secure office space that offers your business a professional environment with flexible commitment terms and curated add ons.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivateOfficePage;