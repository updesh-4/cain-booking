import React, { useState } from 'react';

// Mocked icons since we can't use external libraries. In a real project, you would import them.
const UserIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);
const CalendarIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
    <line x1="16" x2="16" y1="2" y2="6" />
    <line x1="8" x2="8" y1="2" y2="6" />
    <line x1="3" x2="21" y1="10" y2="10" />
  </svg>
);
const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z" />
  </svg>
);

// Mock a `Button` component for demonstration.
// In a real app, this would be an external UI library component.
const MockButton = ({ children, className, ...props }) => (
  <button
    className={mockCn("bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors", className)}
    {...props}
  >
    {children}
  </button>
);

// Assume a utility function for combining Tailwind classes.
// Replace with `clsx`, `cva`, or a similar library in a real project.
const mockCn = (...classes) => classes.filter(Boolean).join(' ');


// Mock booking data to simulate a user's current bookings.
// In a real application, this data would be fetched from a database like Firestore.
const MOCK_BOOKINGS = [
  {
    id: '1',
    purpose: 'Team sync-up',
    workspaceType: 'Meeting Room',
    attendees: 5,
    date: '2024-10-25',
    startTime: '10:00 AM',
    endTime: '11:00 AM'
  },
  {
    id: '2',
    purpose: 'Client presentation',
    workspaceType: 'Private Office',
    attendees: 3,
    date: '2024-10-28',
    startTime: '2:00 PM',
    endTime: '4:00 PM'
  },
  {
    id: '3',
    purpose: 'Brainstorming session',
    workspaceType: 'Co-working',
    attendees: 2,
    date: '2024-11-01',
    startTime: '9:00 AM',
    endTime: '10:00 AM'
  },
];

const Dashboard = () => {
  const [bookings, setBookings] = useState(MOCK_BOOKINGS);
  const [editingBooking, setEditingBooking] = useState(null);
  const [newAttendees, setNewAttendees] = useState(0);
  const [newDate, setNewDate] = useState('');
  const [newStartTime, setNewStartTime] = useState('');
  const [newEndTime, setNewEndTime] = useState('');

  // Function to handle opening the edit modal.
  const handleEdit = (booking) => {
    setEditingBooking(booking);
    setNewAttendees(booking.attendees);
    setNewDate(booking.date);
    setNewStartTime(booking.startTime);
    setNewEndTime(booking.endTime);
  };

  // Function to save the changes made to a booking.
  const handleSaveChanges = () => {
    if (editingBooking) {
      // Create an updated booking object
      const updatedBooking = {
        ...editingBooking,
        attendees: newAttendees,
        date: newDate,
        startTime: newStartTime,
        endTime: newEndTime,
      };

      // Find the booking in the state and replace it with the updated version
      const updatedBookings = bookings.map(b => 
        b.id === updatedBooking.id ? updatedBooking : b
      );

      // Update the state and close the modal
      setBookings(updatedBookings);
      setEditingBooking(null);
    }
  };

  const timeSlots = [
    '9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM',
    '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'
  ];

  const getHour24 = (time) => {
    const [h, period] = time.split(' ');
    let hour = parseInt(h.split(':')[0]);
    if (period === 'PM' && hour !== 12) {
      hour += 12;
    } else if (period === 'AM' && hour === 12) {
      hour = 0;
    }
    return hour;
  };

  return (
    <div className="min-h-screen p-8 bg-gray-50 font-sans">
      <div className="max-w-4xl mx-auto mt-28">
        <h1 className="text-4xl font-extrabold text-slate-800 text-center mb-8">Your Bookings Dashboard</h1>
        
        {/* Check if there are any bookings to display */}
        {bookings.length === 0 ? (
          <div className="bg-white p-6 rounded-2xl shadow-lg text-center text-gray-500">
            You have no upcoming bookings.
          </div>
        ) : (
          <div className="space-y-6">
            {bookings.map((booking) => (
              <div key={booking.id} className="bg-white p-6 rounded-2xl shadow-md border border-gray-100 flex justify-between items-center">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-slate-800 mb-1">{booking.purpose}</h3>
                  <p className="text-gray-600 text-sm mb-3">{booking.workspaceType}</p>
                  <div className="flex items-center space-x-4 text-gray-500 text-sm">
                    <span className="flex items-center"><CalendarIcon className="h-4 w-4 mr-1" /> {booking.date}</span>
                    <span className="flex items-center"><ClockIcon className="h-4 w-4 mr-1" /> {booking.startTime} - {booking.endTime}</span>
                    <span className="flex items-center"><UserIcon className="h-4 w-4 mr-1" /> {booking.attendees} attendees</span>
                  </div>
                </div>
                <div>
                  <MockButton onClick={() => handleEdit(booking)} className="flex items-center">
                    <EditIcon className="h-5 w-5 mr-2" />
                    Edit
                  </MockButton>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Modal for editing a booking */}
        {editingBooking && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center p-4">
            <div className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg">
              <h2 className="text-2xl font-bold text-slate-800 mb-6 text-center">Edit Booking</h2>
              
              <div className="space-y-4">
                {/* Edit Attendees */}
                <div>
                  <label htmlFor="editAttendees" className="block text-gray-700 font-medium mb-2">Number of Attendees</label>
                  <input
                    type="number"
                    id="editAttendees"
                    value={newAttendees}
                    onChange={(e) => setNewAttendees(Math.max(1, parseInt(e.target.value) || 1))}
                    min="1"
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                {/* Edit Date */}
                <div>
                  <label htmlFor="editDate" className="block text-gray-700 font-medium mb-2">Select Date</label>
                  <input
                    type="date"
                    id="editDate"
                    value={newDate}
                    onChange={(e) => setNewDate(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                  />
                </div>

                {/* Edit Time Slots
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="editStartTime" className="block text-gray-700 font-medium mb-2">From</label>
                    <select
                      id="editStartTime"
                      value={newStartTime}
                      onChange={(e) => setNewStartTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none"
                    >
                      {timeSlots.map((slot) => (
                        <option key={slot}>{slot}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label htmlFor="editEndTime" className="block text-gray-700 font-medium mb-2">To</label>
                    <select
                      id="editEndTime"
                      value={newEndTime}
                      onChange={(e) => setNewEndTime(e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 appearance-none"
                    >
                      {timeSlots.map((slot) => {
                        const startHour24 = getHour24(newStartTime);
                        const slotHour24 = getHour24(slot);
                        if (slotHour24 > startHour24) {
                          return <option key={slot}>{slot}</option>;
                        }
                        return null;
                      })}
                    </select>
                  </div>
                </div> */}
              </div>

              {/* Action buttons */}
              <div className="flex justify-end space-x-4 mt-6">
                <MockButton onClick={() => setEditingBooking(null)} className="bg-gray-200 text-gray-800 hover:bg-gray-300">
                  Cancel
                </MockButton>
                <MockButton onClick={handleSaveChanges}>
                  Save Changes
                </MockButton>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
