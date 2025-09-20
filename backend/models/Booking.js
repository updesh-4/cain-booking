const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  purpose: String,
  workspaceType: String,
  attendees: Number,
  date: String,
  startTime: String,
  endTime: String,
  totalPrice: Number,
});

module.exports = mongoose.model("Booking", bookingSchema);