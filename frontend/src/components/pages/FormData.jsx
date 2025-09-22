
  // // import React from "react";
  // // import cabin from "../../assets/cabin.jpg";

  // // const Form = () => {
  // //   console.log('FormData component mounted');
  // //   return (
      
  // //     <div className="min-w-screen min-h-screen bg-gray-100 flex justify-center items-center p-10">
  // //       {/* Left Image */}
  // //       <div className="w-1/2 pr-6">
  // //         <img
  // //           src={cabin}
  // //           alt="Cabin"
  // //           className="w-full h-auto rounded-lg shadow-lg"
  // //         />
  // //       </div>

  // //       {/* Right Form */}
  // //       <div className="w-1/2 bg-white rounded-lg shadow-md p-10">
  // //         <h2 className="text-3xl font-bold mb-2">
  // //           Got questions? We’ve got answers.
  // //         </h2>
  // //         <p className="text-gray-600 mb-6">
  // //           Get in touch with us for more information on any of the products or
  // //           services we offer
  // //         </p>

  // //         <form className="space-y-4">
  // //           {/* Full Name */}
  // //           <input
  // //             type="text"
  // //             placeholder="Full name*"
  // //             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //           />

  // //           {/* Company + Email */}
  // //           <div className="grid grid-cols-2 gap-4">
  // //             <input
  // //               type="text"
  // //               placeholder="Company name*"
  // //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //             />
  // //             <input
  // //               type="email"
  // //               placeholder="Work e-mail address*"
  // //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //             />
  // //           </div>

  // //           {/* Phone + City */}
  // //           <div className="grid grid-cols-2 gap-4">
  // //             <input
  // //               type="tel"
  // //               placeholder="Phone number*"
  // //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //             />
  // //             <input
  // //               type="text"
  // //               placeholder="City*"
  // //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //             />
  // //           </div>

  // //           {/* Area + Centres */}
  // //           <div className="grid grid-cols-2 gap-4">
  // //             <input
  // //               type="text"
  // //               placeholder="Area"
  // //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //             />
  // //             <input
  // //               type="text"
  // //               placeholder="Centres"
  // //               className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //             />
  // //           </div>

  // //           {/* Workspace Type */}
  // //           <select className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black">
  // //             <option>Workspace type*</option>
  // //             <option>Private Office</option>
  // //             <option>Co-working</option>
  // //             <option>Meeting Room</option>
  // //           </select>

  // //           {/* Desks Required */}
  // //           <input
  // //             type="number"
  // //             placeholder="Desks required*"
  // //             className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
  // //           />

  // //           {/* Terms */}
  // //           <p className="text-xs text-gray-600">
  // //             By clicking the below button, you agree to our{" "}
  // //             <a href="#" className="text-blue-600 underline">
  // //               Terms of Service
  // //             </a>{" "}
  // //             and confirm that you have read and understood our{" "}
  // //             <a href="#" className="text-blue-600 underline">
  // //               Privacy Policy
  // //             </a>
  // //             .
  // //           </p>

  // //           {/* Submit Button */}
  // //           <button
  // //             type="submit"
  // //             className="w-full bg-black text-white p-3 rounded-md hover:bg-gray-800"
  // //           >
  // //             Submit
  // //           </button>
  // //         </form>
  // //       </div>
  // //     </div>
  // //   );
  // // };

  // // export default Form;
  import React, { useState } from "react";
  import cabin from "../../assets/cabin.jpg";

  const Form = () => {
    const [formData, setFormData] = useState({
      fullName: '',
      companyName: '',
      workEmail: '',
      phoneNumber: '',
      city: '',
      area: '',
      centres: '',
      workspaceType: '',
      desksRequired: ''
    });

    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ type: '', text: '' });
    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
      
      // Clear field error when user starts typing
      if (errors[name]) {
        setErrors(prev => ({
          ...prev,
          [name]: ''
        }));
      }
    };

    const validateForm = () => {
      const newErrors = {};
      
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.companyName.trim()) newErrors.companyName = 'Company name is required';
      if (!formData.workEmail.trim()) {
        newErrors.workEmail = 'Work email is required';
      } else if (!/\S+@\S+\.\S+/.test(formData.workEmail)) {
        newErrors.workEmail = 'Please enter a valid email address';
      }
      if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
      if (!formData.city.trim()) newErrors.city = 'City is required';
      if (!formData.workspaceType) newErrors.workspaceType = 'Workspace type is required';
      if (!formData.desksRequired) {
        newErrors.desksRequired = 'Number of desks required is required';
      } else if (parseInt(formData.desksRequired) <= 0) {
        newErrors.desksRequired = 'Number of desks must be greater than 0';
      }

      return newErrors;
    };

    const handleSubmit = async (e) => {
      e.preventDefault();
      
      const validationErrors = validateForm();
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors);
        return;
      }

      setLoading(true);
      setMessage({ type: '', text: '' });
      
      try {
        console.log('🚀 Sending request to:', '/api/contact/submit');
        console.log('📦 Request body:', formData);
        
        const response = await fetch('http://localhost:5000/api/contact/submit',{
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });

        console.log('📡 Response status:', response.status);
        console.log('📡 Response headers:', response.headers);

        const data = await response.json();

        if (data.success) {
          setMessage({ 
            type: 'success', 
            text: 'Thank you! Your form has been submitted successfully. We\'ll get back to you soon.' 
          });
          // Reset form
          setFormData({
            fullName: '',
            companyName: '',
            workEmail: '',
            phoneNumber: '',
            city: '',
            area: '',
            centres: '',
            workspaceType: '',
            desksRequired: ''
          });
        } else {
          if (response.status === 409) {
            setMessage({ 
              type: 'error', 
              text: 'A submission with this email already exists. Please use a different email address.' 
            });
          } else if (data.errors) {
            // Handle validation errors from backend
            const backendErrors = {};
            data.errors.forEach(error => {
              backendErrors[error.field || error.param] = error.message || error.msg;
            });
            setErrors(backendErrors);
          } else {
            setMessage({ 
              type: 'error', 
              text: data.message || 'Something went wrong. Please try again.' 
            });
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        setMessage({ 
          type: 'error', 
          text: 'Network error. Please check your connection and try again.' 
        });
      } finally {
        setLoading(false);
      }
    };

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
            Got questions? We've got answers.
          </h2>
          <p className="text-gray-600 mb-6">
            Get in touch with us for more information on any of the products or
            services we offer
          </p>

          {/* Success/Error Messages */}
          {message.text && (
            <div className={`mb-4 p-3 rounded-md ${
              message.type === 'success' 
                ? 'bg-green-100 text-green-700 border border-green-300' 
                : 'bg-red-100 text-red-700 border border-red-300'
            }`}>
              {message.text}
            </div>
          )}

          <div className="space-y-4">
            {/* Full Name */}
            <div>
              <input
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full name*"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.fullName ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
            </div>

            {/* Company + Email */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="text"
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  placeholder="Company name*"
                  className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full ${
                    errors.companyName ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.companyName && <p className="text-red-500 text-sm mt-1">{errors.companyName}</p>}
              </div>
              <div>
                <input
                  type="email"
                  name="workEmail"
                  value={formData.workEmail}
                  onChange={handleChange}
                  placeholder="Work e-mail address*"
                  className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full ${
                    errors.workEmail ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.workEmail && <p className="text-red-500 text-sm mt-1">{errors.workEmail}</p>}
              </div>
            </div>

            {/* Phone + City */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <input
                  type="tel"
                  name="phoneNumber"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Phone number*"
                  className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full ${
                    errors.phoneNumber ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.phoneNumber && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber}</p>}
              </div>
              <div>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="City*"
                  className={`p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black w-full ${
                    errors.city ? 'border-red-500' : 'border-gray-300'
                  }`}
                />
                {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
              </div>
            </div>

            {/* Area + Centres */}
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="area"
                value={formData.area}
                onChange={handleChange}
                placeholder="Area"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
              <input
                type="text"
                name="centres"
                value={formData.centres}
                onChange={handleChange}
                placeholder="Centres"
                className="p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            {/* Workspace Type */}
            <div>
              <select 
                name="workspaceType"
                value={formData.workspaceType}
                onChange={handleChange}
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.workspaceType ? 'border-red-500' : 'border-gray-300'
                }`}
              >
                <option value="">Workspace type*</option>
                <option value="Private Office">Private Office</option>
                <option value="Co-working">Co-working</option>
                <option value="Meeting Room">Meeting Room</option>
                <option value="Hot Desk">Hot Desk</option>
                <option value="Virtual Office">Virtual Office</option>
              </select>
              {errors.workspaceType && <p className="text-red-500 text-sm mt-1">{errors.workspaceType}</p>}
            </div>

            {/* Desks Required */}
            <div>
              <input
                type="number"
                name="desksRequired"
                value={formData.desksRequired}
                onChange={handleChange}
                placeholder="Desks required*"
                min="1"
                className={`w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-black ${
                  errors.desksRequired ? 'border-red-500' : 'border-gray-300'
                }`}
              />
              {errors.desksRequired && <p className="text-red-500 text-sm mt-1">{errors.desksRequired}</p>}
            </div>

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
              type="button"
              onClick={handleSubmit}
              disabled={loading}
              className={`w-full p-3 rounded-md transition-colors ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-black hover:bg-gray-800'
              } text-white`}
            >
              {loading ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </div>
    );
  };

  export default Form;
