  // src/components/ui/OfficeSpacePage.jsx
  import React, { useRef }  from 'react';
  import { useParams, Link } from 'react-router-dom';
  import { useNavigate } from 'react-router-dom';
  import FormData from "./FormData";


  // Corrected import paths to match the file names exactly
  import defaultOfficeSpaceImage from '../../assets/officespace.png';

  const OfficeSpacePage = () => {
    const { city } = useParams();
    const formDataRef = useRef(null);

    // The backgroundImage variable now always points to the default image
    const backgroundImage = defaultOfficeSpaceImage;
   const handleClick = () => {
    formDataRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

    return (
      <div className="pt-20">
        {/* Breadcrumb Navigation */}
        <div className="flex items-center space-x-2 px-10 py-4 text-gray-500 text-sm">
          <Link to="/" className="hover:underline">Home</Link>
          <span>&gt;</span>
          <span>...</span>
          <span>&gt;</span>
          <a href={`/office-spaces/${city}`} className="hover:underline">Office Space</a>
          <span>&gt;</span>
          <span className="text-gray-900">{city}</span>
        </div>

        {/* Hero Section Container */}
        <div className="relative w-full h-[500px] bg-white overflow-hidden">
          {/* Background Image */}
          <div className="absolute top-0 right-0 h-full w-[75%]">
            <img
              src={backgroundImage}
              alt={`Office Space in ${city}`}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text Content Box with Button */}
          <div className="absolute top-1/2 left-10 transform -translate-y-1/2 bg-white p-10 rounded-lg w-[450px] z-10">
            <h1 className="text-4xl font-normal mb-4">Fully-equipped office spaces in {city}</h1>
            <p className="text-lg font-light text-gray-700 mb-6">
              Move-in to a fully-equipped, private and lockable office space with a host of amenities that offers your business flexible commitment terms and curated add ons.
            </p>
            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg" onClick={handleClick}>
              Get in touch
            </button>
          </div>
        </div>
          <div ref={formDataRef} >
        <FormData />
      </div>
      </div>
    );
  };

  export default OfficeSpacePage;