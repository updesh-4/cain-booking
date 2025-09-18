import React, { useState, useEffect } from 'react';

// Main component containing all the logic and UI for the booking form.
export default function CabinBookingForm() {
  const [purpose, setPurpose] = useState('');
  const [workspaceType, setWorkspaceType] = useState('Private Office');
  const [attendees, setAttendees] = useState(1);
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('9:00 AM');
  const [endTime, setEndTime] = useState('10:00 AM');
  const [pricePerHour, setPricePerHour] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Hardcoded prices per hour for different workspace types.
  const prices = {
    'Private Office': 150,
    'Co-working': 50,
    'Meeting Room': 200,
  };

  // Time slots for the dropdown.
  const timeSlots = [
    '9:00 AM',
    '10:00 AM',
    '11:00 AM',
    '12:00 PM',
    '1:00 PM',
    '2:00 PM',
    '3:00 PM',
    '4:00 PM',
    '5:00 PM',
  ];

  // Helper function to convert time string to a 24-hour integer for accurate calculation.
  const getHour24 = (time) => {
    const [h, period] = time.split(' ');
    let hour = parseInt(h.split(':')[0]);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0; // Midnight case
    }
    return hour;
  };

  // This effect runs whenever the workspaceType state changes.
  // It updates the price per hour.
  useEffect(() => {
    setPricePerHour(prices[workspaceType] || 0);
  }, [workspaceType]);

  // This effect calculates the total price based on duration.
  useEffect(() => {
    if (startTime && endTime && pricePerHour) {
      const startHour24 = getHour24(startTime);
      const endHour24 = getHour24(endTime);
      const duration = endHour24 - startHour24;
      setTotalPrice(duration * pricePerHour);
    } else {
      setTotalPrice(0);
    }
  }, [startTime, endTime, pricePerHour]);

  const handleConfirm = () => {
    // In a real application, you would handle payment processing here.
    // For this example, we just show a confirmation message.
    setShowConfirmation(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4 font-sans ">
      <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-gray-100 mt-32">
        <h2 className="text-3xl font-extrabold text-slate-800 mb-6 text-center">Book Your Professional Workspace</h2>
        
        {/* Confirmation Message */}
        {showConfirmation && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-5" role="alert">
            <strong className="font-bold">Booking Confirmed!</strong>
            <span className="block sm:inline ml-2">Proceeding to payment page...</span>
            <span className="absolute top-0 bottom-0 right-0 px-4 py-3 cursor-pointer" onClick={() => setShowConfirmation(false)}>
              <svg className="fill-current h-6 w-6 text-green-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.03a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
            </span>
          </div>
        )}

        {/* Purpose Input Field */}
        <div className="mb-5">
          <label htmlFor="purpose" className="block text-gray-700 font-medium mb-2">Purpose of Booking</label>
          <input
            type="text"
            id="purpose"
            value={purpose}
            onChange={(e) => setPurpose(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
            placeholder="e.g., Team meeting, client presentation"
          />
        </div>

        {/* Workspace Type Dropdown */}
        <div className="mb-5">
          <label htmlFor="workspaceType" className="block text-gray-700 font-medium mb-2">Workspace Type</label>
          <select
            id="workspaceType"
            value={workspaceType}
            onChange={(e) => setWorkspaceType(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none"
          >
            <option>Private Office</option>
            <option>Co-working</option>
            <option>Meeting Room</option>
          </select>
        </div>

        {/* Number of Attendees Input */}
        <div className="mb-5">
          <label htmlFor="attendees" className="block text-gray-700 font-medium mb-2">Number of Attendees</label>
          <input
            type="number"
            id="attendees"
            value={attendees}
            onChange={(e) => setAttendees(Math.max(1, parseInt(e.target.value) || 1))}
            min="1"
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Date Selector */}
        <div className="mb-5">
          <label htmlFor="date" className="block text-gray-700 font-medium mb-2">Select Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
          />
        </div>

        {/* Time Slot Dropdowns */}
        <div className="mb-8 grid grid-cols-2 gap-4">
          <div>
            <label htmlFor="startTime" className="block text-gray-700 font-medium mb-2">From</label>
            <select
              id="startTime"
              value={startTime}
              onChange={(e) => setStartTime(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none"
            >
              {timeSlots.map((slot) => (
                <option key={slot}>{slot}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="endTime" className="block text-gray-700 font-medium mb-2">To</label>
            {/* Conditional Rendering for 'To' time slot */}
            {startTime === '5:00 PM' ? (
              <div className="w-full px-4 py-3 bg-gray-100 rounded-lg text-gray-500">
                No end time available
              </div>
            ) : (
              <select
                id="endTime"
                value={endTime}
                onChange={(e) => setEndTime(e.target.value)}
                className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none"
              >
                {timeSlots.map((slot) => {
                  const startHour24 = getHour24(startTime);
                  const slotHour24 = getHour24(slot);
                  // Ensure 'to' time is always after 'from' time.
                  if (slotHour24 > startHour24) {
                    return <option key={slot}>{slot}</option>;
                  }
                  return null;
                })}
              </select>
            )}
          </div>
        </div>

        {/* Price Display */}
        <div className="text-center mb-6">
          <p className="text-2xl font-bold text-slate-800">
            Total Price: <span className="text-blue-600">  ₹{totalPrice}</span>
          </p>
        </div>

        {/* Confirm and Proceed Button */}
        <button
          onClick={handleConfirm}
          className="w-full bg-blue-600 text-white font-bold py-4 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300 ease-in-out transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Confirm and Proceed to Payment
        </button>
      </div>
    </div>
  );
}
