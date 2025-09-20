// const express = require("express");
// const router = express.Router();
// const Booking = require('../models/Booking');
// // ✅ Test route
// router.get("/test", (req, res) => {
//   res.send("Booking route is working");
// });
// // POST /api/book
// router.post("/", async (req, res) => {
//   try {
//     const booking = new Booking(req.body);
//     await booking.save();
//     res.status(201).json({ message: "Booking saved successfully" });
//   } catch (error) {
//     console.error("Booking error:", error);
//     res.status(500).json({ error: "Failed to save booking" });
//   }
// });

// module.exports = router;


const express = require("express");
const router = express.Router();
const Booking = require('../models/Booking');

// ✅ Test route
router.get("/test", (req, res) => {
  res.send("Booking route is working");
});

// GET /api/book - Fetch all bookings
router.get("/", async (req, res) => {
  try {
    const bookings = await Booking.find().sort({ date: 1, startTime: 1 });
    res.status(200).json({ 
      success: true, 
      bookings: bookings 
    });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to fetch bookings" 
    });
  }
});

// POST /api/book - Create new booking
router.post("/", async (req, res) => {
  try {
    const booking = new Booking(req.body);
    await booking.save();
    res.status(201).json({ 
      success: true, 
      message: "Booking saved successfully",
      booking: booking 
    });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to save booking" 
    });
  }
});

// PUT /api/book/:id - Update existing booking
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedBooking = await Booking.findByIdAndUpdate(
      id, 
      req.body, 
      { new: true, runValidators: true }
    );
    
    if (!updatedBooking) {
      return res.status(404).json({ 
        success: false, 
        error: "Booking not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Booking updated successfully",
      booking: updatedBooking 
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to update booking" 
    });
  }
});

// DELETE /api/book/:id - Delete booking
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedBooking = await Booking.findByIdAndDelete(id);
    
    if (!deletedBooking) {
      return res.status(404).json({ 
        success: false, 
        error: "Booking not found" 
      });
    }
    
    res.status(200).json({ 
      success: true, 
      message: "Booking deleted successfully" 
    });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ 
      success: false, 
      error: "Failed to delete booking" 
    });
  }
});

module.exports = router;