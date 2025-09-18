const mongoose = require('mongoose');

const contactFormSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true,
    maxlength: [100, 'Full name cannot exceed 100 characters']
  },
  companyName: {
    type: String,
    required: [true, 'Company name is required'],
    trim: true,
    maxlength: [100, 'Company name cannot exceed 100 characters']
  },
  workEmail: {
    type: String,
    required: [false, 'Work email is required'],
    trim: true,
    lowercase: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address'
    ]
  },
  phoneNumber: {
    type: String,
    required: [false, 'Phone number is required'],
    trim: true,
    match: [
      /^[\+]?[1-9][\d]{0,15}$/,
      'Please enter a valid phone number'
    ]
  },
  city: {
    type: String,
    required: [false, 'City is required'],
    trim: true,
    maxlength: [50, 'City name cannot exceed 50 characters']
  },
  area: {
    type: String,
    trim: true,
    maxlength: [100, 'Area cannot exceed 100 characters']
  },
  centres: {
    type: String,
    trim: true,
    maxlength: [100, 'Centres cannot exceed 100 characters']
  },
  workspaceType: {
    type: String,
    required: [true, 'Workspace type is required'],
    enum: {
      values: ['Private Office', 'Co-working', 'Meeting Room'],
      message: 'Workspace type must be Private Office, Co-working, or Meeting Room'
    }
  },
  desksRequired: {
    type: Number,
    required: [true, 'Number of desks required is mandatory'],
    min: [1, 'At least 1 desk is required'],
    max: [1000, 'Maximum 1000 desks allowed']
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    enum: ['new', 'contacted', 'converted', 'closed'],
    default: 'new'
  },
  notes: {
    type: String,
    maxlength: [500, 'Notes cannot exceed 500 characters']
  }
}, {
  timestamps: true
});

// Index for faster queries
contactFormSchema.index({ workEmail: 1 });
contactFormSchema.index({ submittedAt: -1 });
contactFormSchema.index({ status: 1 });

module.exports = mongoose.model('ContactForm', contactFormSchema);