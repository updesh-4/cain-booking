import React from 'react';
import { useParams, Link } from 'react-router-dom';

// Import a single, universal image for all cities
import defaultImage from '../../assets/Pgdelhi.jpg';

const CityDetailPage = () => {
  const { city } = useParams();

  return (
    <div className="pt-20">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center space-x-2 px-10 py-4 text-gray-500 text-sm">
        <Link to="/" className="hover:underline">Home</Link>
        <span>&gt;</span>
        <span>Centres</span>
        <span>&gt;</span>
        <span className="text-gray-900">{city}</span>
      </div>

      {/* Hero Section Container */}
      <div className="relative w-full h-[500px] bg-white overflow-hidden">
        {/* Background Image */}
        <div className="absolute top-0 right-0 h-full w-[75%]">
          <img
            src={defaultImage}
            alt={`Office Space in ${city}`}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Text Content Box with Button */}
        <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-10 rounded-lg w-[450px] z-10">
          <h1 className="text-4xl font-normal mb-4">Workspaces in {city}</h1>
          <p className="text-lg font-light text-gray-700 mb-6">
            With WeWork in {city}, you can find what your business needs to thrive. Whether it’s an office space or a coworking space in {city}, our flexible solutions are tailored to cater to businesses of any industry, scale, and stage.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg">
            Get in touch
          </button>
        </div>
      </div>
    </div>
  );
};

export default CityDetailPage;