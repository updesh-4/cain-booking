// src/components/ui/AboutUsPage.jsx
import React from 'react';
import aboutUsImage from '../../assets/aboutus.jpg'; // Replace with your actual image

const AboutUsPage = () => {
  return (
    <div className="bg-white text-gray-800 pt-20 pb-16">
      {/* Shared Container for Image + Content */}
      <div className="w-full px-2 md:px-6">
        {/* Image Section */}
        <img
          src={aboutUsImage}
          alt="About Us"
          className="w-full h-auto object-cover rounded-md mb-10"
        />

        {/* WHO ARE WE Section */}
        <div>
          <h1 className="text-4xl font-semibold text-center mb-8">WHO ARE WE?</h1>

          <p className="text-[17px] leading-relaxed font-light mb-6">
            Power Grid Corporation of India Limited (POWERGRID), is a Schedule ‘A’, ‘Maharatna’ Public Sector Enterprise of Govt. of India which was incorporated on 23rd Oct 1989 under the Company Act, 1956. POWERGRID is a listed Company, with 51.34% holding of Government of India and the balance is held by Institutional Investors and public.
          </p>

          <ul className="list-disc pl-6 text-[17px] leading-relaxed font-light space-y-2 mb-10">
            <li>India’s largest Electric Power Transmission Utility</li>
            <li>Listed Company since 2007</li>
            <li>Consistently rated “Excellent” under Memorandum of Understanding with Ministry of Power since 1993-94</li>
            <li>Credit Rating:</li>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>International Ratings</strong> (consistent with GoI’s Sovereign rating):</li>
              <ul className="list-disc pl-6 space-y-1">
                <li>Standard & Poor’s – BBB (Outlook-Stable)</li>
                <li>Fitch – BBB- (Outlook-Stable)</li>
                <li>Moody’s – Baa3 (Outlook-Stable)</li>
              </ul>
              <li><strong>Domestic Ratings:</strong></li>
              <ul className="list-disc pl-6 space-y-1">
                <li>CRISIL – CRISIL AAA/Stable (Highest Safety)</li>
                <li>ICRA – ICRA AAA/Stable (Highest Safety)</li>
                <li>CARE – CARE AAA (Highest Safety/Lowest Credit Risk)</li>
              </ul>
            </ul>
          </ul>
        </div>

        {/* Key Statistics Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-semibold text-center mb-10">Key Statistics (as of August 31, 2023)</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Transmission */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm transition duration-300 hover:bg-blue-50 hover:shadow-md hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 text-blue-700">Transmission</h3>
              <ul className="list-disc pl-5 space-y-2 text-[16px] font-light text-gray-700">
                <li>1,76,180 km Transmission Lines</li>
                <li>275 Sub-Stations</li>
                <li>4,97,915 MVA Transformation Capacity</li>
              </ul>
            </div>

            {/* Consultancy */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm transition duration-300 hover:bg-green-50 hover:shadow-md hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 text-green-700">Consultancy</h3>
              <ul className="list-disc pl-5 space-y-2 text-[16px] font-light text-gray-700">
                <li>150+ Domestic Clients</li>
                <li>25+ Countries Global Footprints</li>
                <li>25+ Clients Served</li>
              </ul>
            </div>

            {/* Telecom */}
            <div className="bg-gray-50 p-6 rounded-lg shadow-sm transition duration-300 hover:bg-purple-50 hover:shadow-md hover:scale-[1.02]">
              <h3 className="text-xl font-semibold mb-4 text-purple-700">Telecom</h3>
              <ul className="list-disc pl-5 space-y-2 text-[16px] font-light text-gray-700">
                <li>100,000 km Telecom Network Owns & Operates</li>
                <li>3000+ Points of Presence (PoPs)</li>
                <li>500+ Cities Pan India Network Coverage</li>
                <li>99.99% Backbone Telecom Network Availability</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUsPage;
