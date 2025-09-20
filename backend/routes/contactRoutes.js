// const express = require('express');
// const { body } = require('express-validator');
// const {
//   createContactForm,
//   getAllContactForms,
//   getContactFormById,
//   updateContactFormStatus
// } = require('../controllers/contactControllers');

// const router = express.Router();

// // Validation middleware for contact form
// const contactFormValidation = [
//   body('fullName')
//     .trim()
//     .notEmpty()
//     .withMessage('Full name is required')
//     .isLength({ min: 2, max: 100 })
//     .withMessage('Full name must be between 2 and 100 characters'),
  
//   body('companyName')
//     .trim()
//     .notEmpty()
//     .withMessage('Company name is required')
//     .isLength({ min: 2, max: 100 })
//     .withMessage('Company name must be between 2 and 100 characters'),
  
//   body('workEmail')
//     .trim()
//     .notEmpty()
//     .withMessage('Work email is required')
//     .isEmail()
//     .withMessage('Please provide a valid email address')
//     .normalizeEmail(),
  
// // In contactRoutes.js

// body('phoneNumber')
//     .trim()
//     .notEmpty()
//     .withMessage('Phone number is required')
//     .matches(/^[+]?[0-9]{10,15}$/) // This regex is more flexible, allowing 10-15 digits with an optional plus sign
//     .withMessage('Please provide a valid phone number'),
  
//   body('city')
//     .trim()
//     .notEmpty()
//     .withMessage('City is required')
//     .isLength({ min: 2, max: 50 })
//     .withMessage('City must be between 2 and 50 characters'),
  
//   body('area')
//     .optional()
//     .trim()
//     .isLength({ max: 100 })
//     .withMessage('Area cannot exceed 100 characters'),
  
//   body('centres')
//     .optional()
//     .trim()
//     .isLength({ max: 100 })
//     .withMessage('Centres cannot exceed 100 characters'),
  
//   body('workspaceType')
//     .notEmpty()
//     .withMessage('Workspace type is required')
//     .isIn(['Private Office', 'Co-working', 'Meeting Room', 'Hot Desk', 'Virtual Office'])
//     .withMessage('Invalid workspace type'),
  
//   body('desksRequired')
//     .notEmpty()
//     .withMessage('Number of desks is required')
//     .isInt({ min: 1, max: 1000 })
//     .withMessage('Desks required must be between 1 and 1000')
// ];

// // Routes
// router.post('/submit', contactFormValidation, createContactForm);
// router.get('/submissions', getAllContactForms);
// router.get('/submissions/:id', getContactFormById);
// router.patch('/submissions/:id/status', updateContactFormStatus);

// module.exports = router;
const express = require('express');
const { body, validationResult } = require('express-validator');
const nodemailer = require('nodemailer');

const router = express.Router();

// ✅ Nodemailer transporter - Re-using the one from server.js for simplicity
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Validation middleware for contact form
const contactFormValidation = [
  body('fullName')
    .trim()
    .notEmpty()
    .withMessage('Full name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Full name must be between 2 and 100 characters'),
  
  body('companyName')
    .trim()
    .notEmpty()
    .withMessage('Company name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Company name must be between 2 and 100 characters'),
  
  body('workEmail')
    .trim()
    .notEmpty()
    .withMessage('Work email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[0-9]{10,15}$/)
    .withMessage('Please provide a valid phone number'),
  
  body('city')
    .trim()
    .notEmpty()
    .withMessage('City is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('City must be between 2 and 50 characters'),
  
  body('area')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Area cannot exceed 100 characters'),
  
  body('centres')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Centres cannot exceed 100 characters'),
  
  body('workspaceType')
    .notEmpty()
    .withMessage('Workspace type is required')
    .isIn(['Private Office', 'Co-working', 'Meeting Room', 'Hot Desk', 'Virtual Office'])
    .withMessage('Invalid workspace type'),
  
  body('desksRequired')
    .notEmpty()
    .withMessage('Number of desks is required')
    .isInt({ min: 1, max: 1000 })
    .withMessage('Desks required must be between 1 and 1000')
];

// Asynchronous function to handle form submission and send email
const createContactForm = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, errors: errors.array() });
  }

  const { fullName, workEmail } = req.body;

  try {
    // ✅ 1. Simulate saving to the database
    console.log('Form data submitted and validated:', req.body);
    // In a real application, you would save this data to a database here.
    // Example: await ContactForm.create(req.body);

    // ✅ 2. Send the thank you email
    const mailOptions = {
      from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
      to: workEmail,
      subject: "Thank You for Contacting Us!",
      html: `
        <h2>Hello ${fullName},</h2>
        <p>Thank you for reaching out to us. We have received your query and a representative will contact you shortly.</p>
        <p>In the meantime, you can explore more options by visiting our booking page:</p>
        <a href="http://localhost:5173/BookSlot" style="padding: 10px 20px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; display: inline-block;">Book a Slot</a>
        <br/><br/>
        <p>Thank you,<br/>POWERGRID India Team</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log('Thank you email sent successfully to:', workEmail);

    // ✅ 3. Send a success response
    res.status(200).json({ 
      success: true, 
      message: 'Form submitted and thank you email sent successfully!' 
    });

  } catch (error) {
    console.error('Error in form submission or email sending:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to submit form. Please try again.',
      error: error.message
    });
  }
};

// Routes
router.post('/submit', contactFormValidation, createContactForm);
// ... Other routes would be here if they were provided
// router.get('/submissions', getAllContactForms);
// router.get('/submissions/:id', getContactFormById);
// router.patch('/submissions/:id/status', updateContactFormStatus);

module.exports = router;