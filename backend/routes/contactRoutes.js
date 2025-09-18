const express = require('express');
const { body } = require('express-validator');
const {
  createContactForm,
  getAllContactForms,
  getContactFormById,
  updateContactFormStatus
} = require('../controllers/contactControllers');

const router = express.Router();

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
  
// In contactRoutes.js

body('phoneNumber')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .matches(/^[+]?[0-9]{10,15}$/) // This regex is more flexible, allowing 10-15 digits with an optional plus sign
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

// Routes
router.post('/submit', contactFormValidation, createContactForm);
router.get('/submissions', getAllContactForms);
router.get('/submissions/:id', getContactFormById);
router.patch('/submissions/:id/status', updateContactFormStatus);

module.exports = router;