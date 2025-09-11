import React from 'react';
import Logo from "../../assets/logo.jpg";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer = () => {
  return (
    <div className="bg-gray-200 p-8 flex items-start justify-between">

      {/* Column 1: Logo + Social Icons */}
      <div className="flex flex-col items-start gap-4">
        <img src={Logo} alt="logo" className="h-20 w-50 object-contain" />
        <p>Copyright © 2025 WeWork Companies Inc. All rights reserved</p>
        <div className="flex space-x-4">
          <a href="https://www.powergrid.in/en" target="_blank" rel="noopener noreferrer">
            <FaFacebook color="#4267B2" size={30} />
          </a>
          <a href="https://www.powergrid.in/en" target="_blank" rel="noopener noreferrer">
            <FaTwitter color="#1DA1F2" size={30} />
          </a>
          <a href="https://www.powergrid.in/en" target="_blank" rel="noopener noreferrer">
            <FaInstagram color="#E1306C" size={30} />
          </a>
          <a href="https://www.powergrid.in/en" target="_blank" rel="noopener noreferrer">
            <FaLinkedin color="#0077B5" size={30} />
          </a>
          <a href="https://www.youtube.com/c/pgcilind" target="_blank" rel="noopener noreferrer">
            <FaYoutube color="red" size={30} />
          </a>
        </div>
      </div>

      {/* Column 2: Company Links */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">COMPANY</h3>
        <a href="#" className="text-blue-600">Blogs</a>
        <a href="#" className="text-blue-600">Careers</a>
        <a href="#" className="text-blue-600">Brokers</a>
        <a href="#" className="text-blue-600">Impact</a>
        <a href="#" className="text-blue-600">Amenities</a>
        <a href="#" className="text-blue-600">Services Store</a>
      </div>

      {/* Column 3: Support */}
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold">SUPPORT</h3>
        <a href="#" className="text-blue-600">Need help? Click here</a>
        <p>For grievances:</p>
        <a href="mailto: mrinal@powergrid.in" className="text-blue-600">
           mrinal@powergrid.in
        </a>
        <a href="#" className="text-blue-600">Policies</a>
      </div>

      {/* Column 4: Contact Info */}
      <div className="flex flex-col gap-2 max-w-xs">
        <h3 className="font-semibold">CONTACT US</h3>
        <a href="tel:01242571700" className="text-blue-600">
          01242571700
        </a>
        <a href="mailto:" className="text-blue-600">
           mrinal@powergrid.in
        </a>
        <p><strong>PowerGrid</strong></p>
        <p>(Formerly known as PGCIL)</p>
        <p>CIN: U74999KA2016PLC093227</p>
        <p>Regd. Office: Saudamini, Plot No.2, Sector 29, Near Iffco Chowk, Gurgaon</p>
      </div>

    </div>
  );
};

export default Footer;
