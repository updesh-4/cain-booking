
import React from "react";
import cabin from "../../assets/cabin.jpg";

const Form = () => {
  console.log('FormData component mounted');
  return (
    
    <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center items-center p-10">
      {/* Left Image */}
      <div className="w-1/2 pr-6">
        <img
          src={cabin}
          alt="Cabin"
          className="w-full h-auto rounded-lg shadow-lg"
        />
      </div>

      {/* Right Form */}
      <div className="w-1/2 bg-white rounded-lg shadow-md p-10">
        <h2 className="text-3xl font-bold mb-2">
          Got questions? We’ve got answers.
        </h2>
        <p className="text-gray-600 mb-6">
          Get in touch with us for more information on any of the products or
          services we offer
        </p>

        <form className="space-y-4">
          {/* Full Name */}
          <input
            type="text"
            placeholder="Full name*"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Company + Email */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Company name*"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="email"
              placeholder="Work e-mail address*"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Phone + City */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="tel"
              placeholder="Phone number*"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="City*"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Area + Centres */}
          <div className="grid grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Area"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
            <input
              type="text"
              placeholder="Centres"
              className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          {/* Workspace Type */}
          <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
            <option>Workspace type*</option>
            <option>Private Office</option>
            <option>Co-working</option>
            <option>Meeting Room</option>
          </select>

          {/* Desks Required */}
          <input
            type="number"
            placeholder="Desks required*"
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
          />

          {/* Terms */}
          <p className="text-xs text-gray-600">
            By clicking the below button, you agree to our{" "}
            <a href="#" className="text-blue-600 underline">
              Terms of Service
            </a>{" "}
            and confirm that you have read and understood our{" "}
            <a href="#" className="text-blue-600 underline">
              Privacy Policy
            </a>
            .
          </p>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default Form;
