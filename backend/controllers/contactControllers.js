const ContactForm = require('../models/ContactForm');
const { validationResult } = require('express-validator');

// Create new contact form submission
exports.createContactForm = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array()
      });
    }

    const {
      fullName,
      companyName,
      workEmail,
      phoneNumber,
      city,
      area,
      centres,
      workspaceType,
      desksRequired
    } = req.body;

    // Check if email already exists
    const existingSubmission = await ContactForm.findOne({ workEmail });
    if (existingSubmission) {
      return res.status(409).json({
        success: false,
        message: 'A submission with this email already exists',
        submissionId: existingSubmission._id
      });
    }

    // Create new contact form submission
    const newContactForm = new ContactForm({
      fullName,
      companyName,
      workEmail,
      phoneNumber,
      city,
      area: area || '',
      centres: centres || '',
      workspaceType,
      desksRequired
    });

    const savedForm = await newContactForm.save();

    // Log the submission
    console.log(`✅ New contact form submission: ${savedForm._id} from ${workEmail}`);

    res.status(201).json({
      success: true,
      message: 'Contact form submitted successfully',
      data: {
        submissionId: savedForm._id,
        submittedAt: savedForm.submittedAt
      }
    });

  } catch (error) {
    console.error('Error saving contact form:', error);
    
    // Handle mongoose validation errors
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Server error while processing your request',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

// Get all contact form submissions (admin)
exports.getAllContactForms = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, sortBy = 'submittedAt' } = req.query;
    
    const query = {};
    if (status) query.status = status;

    const options = {
      page: parseInt(page),
      limit: parseInt(limit),
      sort: { [sortBy]: -1 },
      select: '-__v'
    };

    const submissions = await ContactForm.find(query)
      .sort(options.sort)
      .limit(options.limit * 1)
      .skip((options.page - 1) * options.limit);

    const total = await ContactForm.countDocuments(query);

    res.status(200).json({
      success: true,
      data: submissions,
      pagination: {
        currentPage: options.page,
        totalPages: Math.ceil(total / options.limit),
        totalSubmissions: total,
        hasNext: options.page < Math.ceil(total / options.limit),
        hasPrev: options.page > 1
      }
    });

  } catch (error) {
    console.error('Error fetching contact forms:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching submissions'
    });
  }
};

// Get single contact form submission
exports.getContactFormById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const submission = await ContactForm.findById(id);
    if (!submission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      data: submission
    });

  } catch (error) {
    console.error('Error fetching contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching submission'
    });
  }
};

// Update contact form status
exports.updateContactFormStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, notes } = req.body;

    const validStatuses = ['new', 'contacted', 'converted', 'closed'];
    if (status && !validStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid status value'
      });
    }

    const updateData = {};
    if (status) updateData.status = status;
    if (notes !== undefined) updateData.notes = notes;

    const updatedSubmission = await ContactForm.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedSubmission) {
      return res.status(404).json({
        success: false,
        message: 'Submission not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Submission updated successfully',
      data: updatedSubmission
    });

  } catch (error) {
    console.error('Error updating contact form:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating submission'
    });
  }
};