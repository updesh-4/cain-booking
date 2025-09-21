// // // const express = require("express");
// // // const cors = require("cors");
// // // const nodemailer = require("nodemailer");
// // // const path = require("path");
// // // const rateLimit = require("express-rate-limit");
// // // require("dotenv").config();

// // // // Import database connection and routes
// // // const connectDB = require("./config/database");
// // // const contactRoutes = require("./routes/contactRoutes");

// // // const app = express();

// // // // Connect to MongoDB
// // // connectDB();

// // // // Middleware
// // // app.use(cors({
// // //   origin: process.env.NODE_ENV === 'production' 
// // //     ? ['https://yourdomain.com'] // Replace with your actual domain
// // //     : ['http://localhost:3000', 'http://localhost:5173'], // Dev origins
// // //   credentials: true
// // // }));

// // // app.use(express.json({ limit: '10mb' }));
// // // app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // // // Rate limiting
// // // const limiter = rateLimit({
// // //   windowMs: 15 * 60 * 1000, // 15 minutes
// // //   max: 100, // limit each IP to 100 requests per windowMs
// // //   message: {
// // //     success: false,
// // //     message: 'Too many requests from this IP, please try again later.'
// // //   }
// // // });

// // // const strictLimiter = rateLimit({
// // //   windowMs: 15 * 60 * 1000, // 15 minutes
// // //   max: 10, // limit each IP to 5 form submissions per windowMs
// // //   message: {
// // //     success: false,
// // //     message: 'Too many form submissions, please try again later.'
// // //   }
// // // });

// // // app.use(limiter);

// // // // In-memory OTP store: { email or phone: { otp, expiresAt } }
// // // const otpStore = {};

// // // // ✅ Simulated DB lookup — replace with real DB query later
// // // async function findUserByEmail(email) {
// // //   return new Promise((resolve) => {
// // //     setTimeout(() => {
// // //       const mockExistingUsers = ["vidhiichauhan7@gmail.com", "example@domain.com"];
// // //       const user = mockExistingUsers.includes(email) ? { email } : null;
// // //       resolve(user);
// // //     }, 100);
// // //   });
// // // }

// // // // ✅ Nodemailer transporter
// // // const transporter = nodemailer.createTransport({
// // //   service: "gmail",
// // //   auth: {
// // //     user: process.env.EMAIL_USER,
// // //     pass: process.env.EMAIL_PASS,
// // //   },
// // // });

// // // // Health check endpoint
// // // app.get('/api/health', (req, res) => {
// // //   res.status(200).json({
// // //     success: true,
// // //     message: 'Server is running',
// // //     timestamp: new Date().toISOString()
// // //   });
// // // });

// // // // ✅ Contact form routes
// // // // app.use('/api/contact', strictLimiter, contactRoutes);
// // // app.use('/api/contact', contactRoutes);

// // // // ✅ Send OTP to email
// // // app.post("/api/send-otp", async (req, res) => {
// // //   const { email } = req.body;

// // //   if (!email || typeof email !== "string") {
// // //     return res.status(400).json({ success: false, message: "Invalid or missing email" });
// // //   }

// // //   const otp = Math.floor(1000 + Math.random() * 9000);
// // //   const expiresAt = Date.now() + 2 * 60 * 1000;

// // //   otpStore[email] = { otp, expiresAt };
// // //   console.log(`Generated OTP ${otp} for ${email}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

// // //   const mailOptions = {
// // //     from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
// // //     to: email,
// // //     subject: "Your POWERGRID OTP Code",
// // //     html: `
// // //       <h2>POWERGRID</h2>
// // //       <p>Hi there,</p>
// // //       <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
// // //       <p>This code is valid for 2 minutes.</p>
// // //       <br />
// // //       <p>Thank you,<br />POWERGRID India Team</p>
// // //     `,
// // //   };

// // //   try {
// // //     await transporter.sendMail(mailOptions);
// // //     console.log("OTP email sent successfully");
// // //     res.status(200).json({ success: true });
// // //   } catch (error) {
// // //     console.error("Error sending OTP email:", error);
// // //     res.status(500).json({ success: false, error: error.message });
// // //   }
// // // });

// // // // ✅ Verify email OTP
// // // app.post("/api/verify-otp", async (req, res) => {
// // //   const { email, otp } = req.body;

// // //   if (!email || !otp) {
// // //     return res.status(400).json({ success: false, message: "Missing email or OTP" });
// // //   }

// // //   const record = otpStore[email];
// // //   console.log("Verifying email:", email);
// // //   console.log("Received OTP:", otp);
// // //   console.log("Stored record:", record);

// // //   if (!record) {
// // //     return res.status(400).json({ success: false, message: "No OTP found for this email" });
// // //   }

// // //   if (Date.now() > record.expiresAt) {
// // //     return res.status(400).json({ success: false, message: "OTP expired" });
// // //   }

// // //   if (record.otp.toString().trim() !== otp.toString().trim()) {
// // //     return res.status(400).json({ success: false, message: "Incorrect OTP" });
// // //   }

// // //   try {
// // //     const user = await findUserByEmail(email);
// // //     const isExistingUser = !!user;

// // //     console.log("User lookup result:", user);

// // //     delete otpStore[email];
// // //     console.log(`✅ Email OTP verified for ${email} — Existing user: ${isExistingUser}`);

// // //     res.status(200).json({
// // //       success: true,
// // //       message: "OTP verified successfully",
// // //       existingUser: isExistingUser,
// // //       newUser: !isExistingUser,
// // //     });
// // //   } catch (error) {
// // //     console.error("Error checking user:", error);
// // //     res.status(500).json({ success: false, message: "Server error during user lookup" });
// // //   }
// // // });

// // // // ✅ Send OTP to phone
// // // app.post("/api/send-phone-otp", (req, res) => {
// // //   const { phone } = req.body;

// // //   if (!phone || typeof phone !== "string" || !/^\+\d{10,15}$/.test(phone)) {
// // //     return res.status(400).json({ success: false, message: "Invalid phone number" });
// // //   }

// // //   const otp = Math.floor(1000 + Math.random() * 9000);
// // //   const expiresAt = Date.now() + 2 * 60 * 1000;

// // //   otpStore[phone] = { otp, expiresAt };
// // //   console.log(`Generated OTP ${otp} for ${phone}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

// // //   res.status(200).json({ success: true });
// // // });

// // // // ✅ Verify phone OTP
// // // app.post("/api/verify-phone-otp", (req, res) => {
// // //   const { phone, otp } = req.body;

// // //   if (!phone || !otp) {
// // //     return res.status(400).json({ success: false, message: "Missing phone or OTP" });
// // //   }

// // //   const record = otpStore[phone];
// // //   console.log("Verifying phone:", phone);
// // //   console.log("Received OTP:", otp);
// // //   console.log("Stored record:", record);

// // //   if (!record) {
// // //     return res.status(400).json({ success: false, message: "No OTP found for this phone number" });
// // //   }

// // //   if (Date.now() > record.expiresAt) {
// // //     return res.status(400).json({ success: false, message: "OTP expired" });
// // //   }

// // //   if (record.otp.toString().trim() !== otp.toString().trim()) {
// // //     return res.status(400).json({ success: false, message: "Incorrect OTP" });
// // //   }

// // //   delete otpStore[phone];
// // //   console.log(`✅ Phone OTP verified for ${phone}`);
// // //   res.status(200).json({ success: true });
// // // });

// // // // Error handling middleware
// // // app.use((err, req, res, next) => {
// // //   console.error(err.stack);
// // //   res.status(500).json({
// // //     success: false,
// // //     message: 'Something went wrong!',
// // //     error: process.env.NODE_ENV === 'development' ? err.message : undefined
// // //   });
// // // });

// // // // 404 handler for API routes
// // // app.use('/api/*', (req, res) => {
// // //   res.status(404).json({
// // //     success: false,
// // //     message: 'API endpoint not found'
// // //   });
// // // });

// // // // ✅ Serve frontend for all routes (React Router fallback)
// // // app.use(express.static(path.join(__dirname, "dist"))); // Adjust if using Vite or CRA

// // // app.get("*", (req, res) => {
// // //   res.sendFile(path.join(__dirname, "dist", "index.html")); // Ensure this path matches your build output
// // // });

// // // // ✅ Start server
// // // const PORT = process.env.PORT || 5000;
// // // app.listen(PORT, () => {
// // //   console.log(`🚀 Server running on port ${PORT}`);
// // //   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// // // });

// // const express = require("express");
// // const cors = require("cors");
// // const nodemailer = require("nodemailer");
// // const path = require("path");
// // const rateLimit = require("express-rate-limit");
// // require("dotenv").config();

// // // Import database connection and routes
// // const connectDB = require("./config/database");
// // const contactRoutes = require("./routes/contactRoutes");

// // const app = express();

// // // Connect to MongoDB
// // connectDB();

// // // Middleware - CORRECTED CORS CONFIGURATION
// // app.use(cors({
// //   origin: process.env.NODE_ENV === 'production' 
// //     ? ['https://yourdomain.com'] // Replace with your actual domain
// //     : [
// //         'http://localhost:3000',  // Create React App
// //         'http://localhost:5173',  // Vite default
// //         'http://localhost:5174',  // Your current Vite port
// //         'http://localhost:4173',  // Vite preview
// //         'http://localhost:8080'   // Alternative dev port
// //       ],
// //   credentials: true,
// //   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
// //   allowedHeaders: ['Content-Type', 'Authorization']
// // }));

// // app.use(express.json({ limit: '10mb' }));
// // app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // // Rate limiting
// // const limiter = rateLimit({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 100, // limit each IP to 100 requests per windowMs
// //   message: {
// //     success: false,
// //     message: 'Too many requests from this IP, please try again later.'
// //   }
// // });

// // const strictLimiter = rateLimit({
// //   windowMs: 15 * 60 * 1000, // 15 minutes
// //   max: 10, // limit each IP to 5 form submissions per windowMs
// //   message: {
// //     success: false,
// //     message: 'Too many form submissions, please try again later.'
// //   }
// // });

// // app.use(limiter);

// // // In-memory OTP store: { email or phone: { otp, expiresAt } }
// // const otpStore = {};

// // // ✅ Simulated DB lookup — replace with real DB query later
// // async function findUserByEmail(email) {
// //   return new Promise((resolve) => {
// //     setTimeout(() => {
// //       const mockExistingUsers = ["vidhiichauhan7@gmail.com", "example@domain.com"];
// //       const user = mockExistingUsers.includes(email) ? { email } : null;
// //       resolve(user);
// //     }, 100);
// //   });
// // }

// // // ✅ Nodemailer transporter
// // const transporter = nodemailer.createTransport({
// //   service: "gmail",
// //   auth: {
// //     user: process.env.EMAIL_USER,
// //     pass: process.env.EMAIL_PASS,
// //   },
// // });

// // // Health check endpoint
// // app.get('/api/health', (req, res) => {  
// //   res.status(200).json({
// //     success: true,
// //     message: 'Server is running',
// //     timestamp: new Date().toISOString()
// //   });
// // });

// // // ✅ Contact form routes
// // // app.use('/api/contact', strictLimiter, contactRoutes);
// // app.use('/api/contact', contactRoutes);

// // // ✅ Send OTP to email
// // app.post("/api/send-otp", async (req, res) => {
// //   const { email } = req.body;

// //   if (!email || typeof email !== "string") {
// //     return res.status(400).json({ success: false, message: "Invalid or missing email" });
// //   }

// //   const otp = Math.floor(1000 + Math.random() * 9000);
// //   const expiresAt = Date.now() + 2 * 60 * 1000;

// //   otpStore[email] = { otp, expiresAt };
// //   console.log(`Generated OTP ${otp} for ${email}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

// //   const mailOptions = {
// //     from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
// //     to: email,
// //     subject: "Your POWERGRID OTP Code",
// //     html: `
// //       <h2>POWERGRID</h2>
// //       <p>Hi there,</p>
// //       <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
// //       <p>This code is valid for 2 minutes.</p>
// //       <br />
// //       <p>Thank you,<br />POWERGRID India Team</p>
// //     `,
// //   };

// //   try {
// //     await transporter.sendMail(mailOptions);
// //     console.log("OTP email sent successfully");
// //     res.status(200).json({ success: true });
// //   } catch (error) {
// //     console.error("Error sending OTP email:", error);
// //     res.status(500).json({ success: false, error: error.message });
// //   }
// // });

// // // ✅ Verify email OTP
// // app.post("/api/verify-otp", async (req, res) => {
// //   const { email, otp } = req.body;

// //   if (!email || !otp) {
// //     return res.status(400).json({ success: false, message: "Missing email or OTP" });
// //   }

// //   const record = otpStore[email];
// //   console.log("Verifying email:", email);
// //   console.log("Received OTP:", otp);
// //   console.log("Stored record:", record);

// //   if (!record) {
// //     return res.status(400).json({ success: false, message: "No OTP found for this email" });
// //   }

// //   if (Date.now() > record.expiresAt) {
// //     return res.status(400).json({ success: false, message: "OTP expired" });
// //   }

// //   if (record.otp.toString().trim() !== otp.toString().trim()) {
// //     return res.status(400).json({ success: false, message: "Incorrect OTP" });
// //   }

// //   try {
// //     const user = await findUserByEmail(email);
// //     const isExistingUser = !!user;

// //     console.log("User lookup result:", user);

// //     delete otpStore[email];
// //     console.log(`✅ Email OTP verified for ${email} — Existing user: ${isExistingUser}`);

// //     res.status(200).json({
// //       success: true,
// //       message: "OTP verified successfully",
// //       existingUser: isExistingUser,
// //       newUser: !isExistingUser,
// //     });
// //   } catch (error) {
// //     console.error("Error checking user:", error);
// //     res.status(500).json({ success: false, message: "Server error during user lookup" });
// //   }
// // });

// // // ✅ Send OTP to phone
// // app.post("/api/send-phone-otp", (req, res) => {
// //   const { phone } = req.body;

// //   if (!phone || typeof phone !== "string" || !/^\+\d{10,15}$/.test(phone)) {
// //     return res.status(400).json({ success: false, message: "Invalid phone number" });
// //   }

// //   const otp = Math.floor(1000 + Math.random() * 9000);
// //   const expiresAt = Date.now() + 2 * 60 * 1000;

// //   otpStore[phone] = { otp, expiresAt };
// //   console.log(`Generated OTP ${otp} for ${phone}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

// //   res.status(200).json({ success: true });
// // });

// // // ✅ Verify phone OTP
// // app.post("/api/verify-phone-otp", (req, res) => {
// //   const { phone, otp } = req.body;

// //   if (!phone || !otp) {
// //     return res.status(400).json({ success: false, message: "Missing phone or OTP" });
// //   }

// //   const record = otpStore[phone];
// //   console.log("Verifying phone:", phone);
// //   console.log("Received OTP:", otp);
// //   console.log("Stored record:", record);

// //   if (!record) {
// //     return res.status(400).json({ success: false, message: "No OTP found for this phone number" });
// //   }

// //   if (Date.now() > record.expiresAt) {
// //     return res.status(400).json({ success: false, message: "OTP expired" });
// //   }

// //   if (record.otp.toString().trim() !== otp.toString().trim()) {
// //     return res.status(400).json({ success: false, message: "Incorrect OTP" });
// //   }

// //   delete otpStore[phone];
// //   console.log(`✅ Phone OTP verified for ${phone}`);
// //   res.status(200).json({ success: true });
// // });

// // // Error handling middleware
// // app.use((err, req, res, next) => {
// //   console.error(err.stack);
// //   res.status(500).json({
// //     success: false,
// //     message: 'Something went wrong!',
// //     error: process.env.NODE_ENV === 'development' ? err.message : undefined
// //   });
// // });

// // // 404 handler for API routes
// // app.use('/api/*', (req, res) => {
// //   res.status(404).json({
// //     success: false,
// //     message: 'API endpoint not found'
// //   });
// // });

// // // ✅ Serve frontend for all routes (React Router fallback)
// // app.use(express.static(path.join(__dirname, "dist"))); // Adjust if using Vite or CRA

// // app.get("*", (req, res) => {
// //   res.sendFile(path.join(__dirname, "dist", "index.html")); // Ensure this path matches your build output
// // });

// // // ✅ Start server
// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => {
// //   console.log(`🚀 Server running on port ${PORT}`);
// //   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// // });

// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const path = require("path");
// const rateLimit = require("express-rate-limit");
// require("dotenv").config();

// // The contactRoutes file now contains the createContactForm logic
// const contactRoutes = require("./routes/contactRoutes"); 

// const app = express();

// // Connect to MongoDB
// // NOTE: I am assuming you have this function defined elsewhere
// // const connectDB = require("./config/database");
// // connectDB();

// // Middleware - CORRECTED CORS CONFIGURATION
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://yourdomain.com'] // Replace with your actual domain
//     : [
//       'http://localhost:3000',  // Create React App
//       'http://localhost:5173',  // Vite default
//       'http://localhost:5174',  // Your current Vite port
//       'http://localhost:4173',  // Vite preview
//       'http://localhost:8080'   // Alternative dev port
//       ],
//   credentials: true,
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
//   allowedHeaders: ['Content-Type', 'Authorization']
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: {
//     success: false,
//     message: 'Too many requests from this IP, please try again later.'
//   }
// });

// app.use(limiter);

// // In-memory OTP store: { email or phone: { otp, expiresAt } }
// const otpStore = {};

// // ✅ Simulated DB lookup — replace with real DB query later
// async function findUserByEmail(email) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const mockExistingUsers = ["vidhiichauhan7@gmail.com", "example@domain.com"];
//       const user = mockExistingUsers.includes(email) ? { email } : null;
//       resolve(user);
//     }, 100);
//   });
// }

// // ✅ Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {   
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ Contact form routes - This now points to the updated router file
// app.use('/api/contact', contactRoutes);

// // ✅ Send OTP to email
// app.post("/api/send-otp", async (req, res) => {
//   const { email } = req.body;

//   if (!email || typeof email !== "string") {
//     return res.status(400).json({ success: false, message: "Invalid or missing email" });
//   }

//   const otp = Math.floor(1000 + Math.random() * 9000);
//   const expiresAt = Date.now() + 2 * 60 * 1000;

//   otpStore[email] = { otp, expiresAt };
//   console.log(`Generated OTP ${otp} for ${email}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

//   const mailOptions = {
//     from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
//     to: email,
//     subject: "Your POWERGRID OTP Code",
//     html: `
//       <h2>POWERGRID</h2>
//       <p>Hi there,</p>
//       <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
//       <p>This code is valid for 2 minutes.</p>
//       <br />
//       <p>Thank you,<br />POWERGRID India Team</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent successfully");
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ Verify email OTP
// app.post("/api/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ success: false, message: "Missing email or OTP" });
//   }

//   const record = otpStore[email];
//   console.log("Verifying email:", email);
//   console.log("Received OTP:", otp);
//   console.log("Stored record:", record);

//   if (!record) {
//     return res.status(400).json({ success: false, message: "No OTP found for this email" });
//   }

//   if (Date.now() > record.expiresAt) {
//     return res.status(400).json({ success: false, message: "OTP expired" });
//   }

//   if (record.otp.toString().trim() !== otp.toString().trim()) {
//     return res.status(400).json({ success: false, message: "Incorrect OTP" });
//   }

//   try {
//     const user = await findUserByEmail(email);
//     const isExistingUser = !!user;

//     console.log("User lookup result:", user);

//     delete otpStore[email];
//     console.log(`✅ Email OTP verified for ${email} — Existing user: ${isExistingUser}`);

//     res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//       existingUser: isExistingUser,
//       newUser: !isExistingUser,
//     });
//   } catch (error) {
//     console.error("Error checking user:", error);
//     res.status(500).json({ success: false, message: "Server error during user lookup" });
//   }
// });

// // ✅ Send OTP to phone
// app.post("/api/send-phone-otp", (req, res) => {
//   const { phone } = req.body;

//   if (!phone || typeof phone !== "string" || !/^\+\d{10,15}$/.test(phone)) {
//     return res.status(400).json({ success: false, message: "Invalid phone number" });
//   }

//   const otp = Math.floor(1000 + Math.random() * 9000);
//   const expiresAt = Date.now() + 2 * 60 * 1000;

//   otpStore[phone] = { otp, expiresAt };
//   console.log(`Generated OTP ${otp} for ${phone}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

//   res.status(200).json({ success: true });
// });

// // ✅ Verify phone OTP
// app.post("/api/verify-phone-otp", (req, res) => {
//   const { phone, otp } = req.body;

//   if (!phone || !otp) {
//     return res.status(400).json({ success: false, message: "Missing phone or OTP" });
//   }

//   const record = otpStore[phone];
//   console.log("Verifying phone:", phone);
//   console.log("Received OTP:", otp);
//   console.log("Stored record:", record);

//   if (!record) {
//     return res.status(400).json({ success: false, message: "No OTP found for this phone number" });
//   }

//   if (Date.now() > record.expiresAt) {
//     return res.status(400).json({ success: false, message: "OTP expired" });
//   }

//   if (record.otp.toString().trim() !== otp.toString().trim()) {
//     return res.status(400).json({ success: false, message: "Incorrect OTP" });
//   }

//   delete otpStore[phone];
//   console.log(`✅ Phone OTP verified for ${phone}`);
//   res.status(200).json({ success: true });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // 404 handler for API routes
// app.use('/api/*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'API endpoint not found'
//   });
// });

// // ✅ Serve frontend for all routes (React Router fallback)
// app.use(express.static(path.join(__dirname, "dist"))); // Adjust if using Vite or CRA

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html")); // Ensure this path matches your build output
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// });



// const express = require("express");
// const cors = require("cors");
// const nodemailer = require("nodemailer");
// const path = require("path");
// const rateLimit = require("express-rate-limit");
// require("dotenv").config();

// // Import database connection and routes
// const connectDB = require("./config/database");
// const contactRoutes = require("./routes/contactRoutes");

// const app = express();

// // Connect to MongoDB
// connectDB();

// // Middleware
// app.use(cors({
//   origin: process.env.NODE_ENV === 'production' 
//     ? ['https://yourdomain.com'] // Replace with your actual domain
//     : ['http://localhost:3000', 'http://localhost:5173'], // Dev origins
//   credentials: true
// }));

// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// // Rate limiting
// const limiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 100, // limit each IP to 100 requests per windowMs
//   message: {
//     success: false,
//     message: 'Too many requests from this IP, please try again later.'
//   }
// });

// const strictLimiter = rateLimit({
//   windowMs: 15 * 60 * 1000, // 15 minutes
//   max: 10, // limit each IP to 5 form submissions per windowMs
//   message: {
//     success: false,
//     message: 'Too many form submissions, please try again later.'
//   }
// });

// app.use(limiter);

// // In-memory OTP store: { email or phone: { otp, expiresAt } }
// const otpStore = {};

// // ✅ Simulated DB lookup — replace with real DB query later
// async function findUserByEmail(email) {
//   return new Promise((resolve) => {
//     setTimeout(() => {
//       const mockExistingUsers = ["vidhiichauhan7@gmail.com", "example@domain.com"];
//       const user = mockExistingUsers.includes(email) ? { email } : null;
//       resolve(user);
//     }, 100);
//   });
// }

// // ✅ Nodemailer transporter
// const transporter = nodemailer.createTransport({
//   service: "gmail",
//   auth: {
//     user: process.env.EMAIL_USER,
//     pass: process.env.EMAIL_PASS,
//   },
// });

// // Health check endpoint
// app.get('/api/health', (req, res) => {
//   res.status(200).json({
//     success: true,
//     message: 'Server is running',
//     timestamp: new Date().toISOString()
//   });
// });

// // ✅ Contact form routes
// // app.use('/api/contact', strictLimiter, contactRoutes);
// app.use('/api/contact', contactRoutes);

// // ✅ Send OTP to email
// app.post("/api/send-otp", async (req, res) => {
//   const { email } = req.body;

//   if (!email || typeof email !== "string") {
//     return res.status(400).json({ success: false, message: "Invalid or missing email" });
//   }

//   const otp = Math.floor(1000 + Math.random() * 9000);
//   const expiresAt = Date.now() + 2 * 60 * 1000;

//   otpStore[email] = { otp, expiresAt };
//   console.log(`Generated OTP ${otp} for ${email}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

//   const mailOptions = {
//     from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
//     to: email,
//     subject: "Your POWERGRID OTP Code",
//     html: `
//       <h2>POWERGRID</h2>
//       <p>Hi there,</p>
//       <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
//       <p>This code is valid for 2 minutes.</p>
//       <br />
//       <p>Thank you,<br />POWERGRID India Team</p>
//     `,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     console.log("OTP email sent successfully");
//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("Error sending OTP email:", error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// });

// // ✅ Verify email OTP
// app.post("/api/verify-otp", async (req, res) => {
//   const { email, otp } = req.body;

//   if (!email || !otp) {
//     return res.status(400).json({ success: false, message: "Missing email or OTP" });
//   }

//   const record = otpStore[email];
//   console.log("Verifying email:", email);
//   console.log("Received OTP:", otp);
//   console.log("Stored record:", record);

//   if (!record) {
//     return res.status(400).json({ success: false, message: "No OTP found for this email" });
//   }

//   if (Date.now() > record.expiresAt) {
//     return res.status(400).json({ success: false, message: "OTP expired" });
//   }

//   if (record.otp.toString().trim() !== otp.toString().trim()) {
//     return res.status(400).json({ success: false, message: "Incorrect OTP" });
//   }

//   try {
//     const user = await findUserByEmail(email);
//     const isExistingUser = !!user;

//     console.log("User lookup result:", user);

//     delete otpStore[email];
//     console.log(`✅ Email OTP verified for ${email} — Existing user: ${isExistingUser}`);

//     res.status(200).json({
//       success: true,
//       message: "OTP verified successfully",
//       existingUser: isExistingUser,
//       newUser: !isExistingUser,
//     });
//   } catch (error) {
//     console.error("Error checking user:", error);
//     res.status(500).json({ success: false, message: "Server error during user lookup" });
//   }
// });

// // ✅ Send OTP to phone
// app.post("/api/send-phone-otp", (req, res) => {
//   const { phone } = req.body;

//   if (!phone || typeof phone !== "string" || !/^\+\d{10,15}$/.test(phone)) {
//     return res.status(400).json({ success: false, message: "Invalid phone number" });
//   }

//   const otp = Math.floor(1000 + Math.random() * 9000);
//   const expiresAt = Date.now() + 2 * 60 * 1000;

//   otpStore[phone] = { otp, expiresAt };
//   console.log(`Generated OTP ${otp} for ${phone}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

//   res.status(200).json({ success: true });
// });

// // ✅ Verify phone OTP
// app.post("/api/verify-phone-otp", (req, res) => {
//   const { phone, otp } = req.body;

//   if (!phone || !otp) {
//     return res.status(400).json({ success: false, message: "Missing phone or OTP" });
//   }

//   const record = otpStore[phone];
//   console.log("Verifying phone:", phone);
//   console.log("Received OTP:", otp);
//   console.log("Stored record:", record);

//   if (!record) {
//     return res.status(400).json({ success: false, message: "No OTP found for this phone number" });
//   }

//   if (Date.now() > record.expiresAt) {
//     return res.status(400).json({ success: false, message: "OTP expired" });
//   }

//   if (record.otp.toString().trim() !== otp.toString().trim()) {
//     return res.status(400).json({ success: false, message: "Incorrect OTP" });
//   }

//   delete otpStore[phone];
//   console.log(`✅ Phone OTP verified for ${phone}`);
//   res.status(200).json({ success: true });
// });

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     success: false,
//     message: 'Something went wrong!',
//     error: process.env.NODE_ENV === 'development' ? err.message : undefined
//   });
// });

// // 404 handler for API routes
// app.use('/api/*', (req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'API endpoint not found'
//   });
// });

// // ✅ Serve frontend for all routes (React Router fallback)
// app.use(express.static(path.join(__dirname, "dist"))); // Adjust if using Vite or CRA

// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "dist", "index.html")); // Ensure this path matches your build output
// });

// // ✅ Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`🚀 Server running on port ${PORT}`);
//   console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
// });

const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");
const rateLimit = require("express-rate-limit");
require("dotenv").config();

// Import database connection and routes
const connectDB = require("./config/database");
const contactRoutes = require("./routes/contactRoutes");
const bookingRoutes = require("./routes/bookings");


const app = express();

// Connect to MongoDB
connectDB();

// Middleware - CORRECTED CORS CONFIGURATION
app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? ['https://cain-booking-fr.onrender.com',
      'https://backend-cabin.onrender.com'
    ] // Replace with your actual domain
    : [
        'http://localhost:3000',  // Create React App
        'http://localhost:5173',  // Vite default
        'http://localhost:5174',  // Your current Vite port
        'http://localhost:4173',  // Vite preview
        'http://localhost:8080'   // Alternative dev port
      ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again later.'
  }
});

const strictLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 5 form submissions per windowMs
  message: {
    success: false,
    message: 'Too many form submissions, please try again later.'
  }
});

app.use(limiter);

// In-memory OTP store: { email or phone: { otp, expiresAt } }
const otpStore = {};

// ✅ Simulated DB lookup — replace with real DB query later
async function findUserByEmail(email) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockExistingUsers = ["vidhiichauhan7@gmail.com", "example@domain.com"];
      const user = mockExistingUsers.includes(email) ? { email } : null;
      resolve(user);
    }, 100);
  });
}

// ✅ Nodemailer transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Health check endpoint
app.get('/api/health', (req, res) => {  
  res.status(200).json({
    success: true,
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// ✅ Contact form routes
// app.use('/api/contact', strictLimiter, contactRoutes);
app.use('/api/contact', contactRoutes);
app.use("/api/book", bookingRoutes);


// ✅ Send OTP to email
app.post("/api/send-otp", async (req, res) => {
  const { email } = req.body;

  if (!email || typeof email !== "string") {
    return res.status(400).json({ success: false, message: "Invalid or missing email" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = Date.now() + 2 * 60 * 1000;

  otpStore[email] = { otp, expiresAt };
  console.log(`Generated OTP ${otp} for ${email}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

  const mailOptions = {
    from: '"POWERGRID India" <noreplypowergridotp@gmail.com>',
    to: email,
    subject: "Your POWERGRID OTP Code",
    html: `
      <h2>POWERGRID</h2>
      <p>Hi there,</p>
      <p><strong>${otp}</strong> is your One-Time Password (OTP)</p>
      <p>This code is valid for 2 minutes.</p>
      <br />
      <p>Thank you,<br />POWERGRID India Team</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("OTP email sent successfully");
    res.status(200).json({ success: true });
  } catch (error) {
    console.error("Error sending OTP email:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// ✅ Verify email OTP
app.post("/api/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return res.status(400).json({ success: false, message: "Missing email or OTP" });
  }

  const record = otpStore[email];
  console.log("Verifying email:", email);
  console.log("Received OTP:", otp);
  console.log("Stored record:", record);

  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP found for this email" });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp.toString().trim() !== otp.toString().trim()) {
    return res.status(400).json({ success: false, message: "Incorrect OTP" });
  }

  try {
    const user = await findUserByEmail(email);
    const isExistingUser = !!user;

    console.log("User lookup result:", user);

    delete otpStore[email];
    console.log(`✅ Email OTP verified for ${email} — Existing user: ${isExistingUser}`);

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
      existingUser: isExistingUser,
      newUser: !isExistingUser,
    });
  } catch (error) {
    console.error("Error checking user:", error);
    res.status(500).json({ success: false, message: "Server error during user lookup" });
  }
});

// ✅ Send OTP to phone
app.post("/api/send-phone-otp", (req, res) => {
  const { phone } = req.body;

  if (!phone || typeof phone !== "string" || !/^\+\d{10,15}$/.test(phone)) {
    return res.status(400).json({ success: false, message: "Invalid phone number" });
  }

  const otp = Math.floor(1000 + Math.random() * 9000);
  const expiresAt = Date.now() + 2 * 60 * 1000;

  otpStore[phone] = { otp, expiresAt };
  console.log(`Generated OTP ${otp} for ${phone}, valid until ${new Date(expiresAt).toLocaleTimeString()}`);

  res.status(200).json({ success: true });
});

// ✅ Verify phone OTP
app.post("/api/verify-phone-otp", (req, res) => {
  const { phone, otp } = req.body;

  if (!phone || !otp) {
    return res.status(400).json({ success: false, message: "Missing phone or OTP" });
  }

  const record = otpStore[phone];
  console.log("Verifying phone:", phone);
  console.log("Received OTP:", otp);
  console.log("Stored record:", record);

  if (!record) {
    return res.status(400).json({ success: false, message: "No OTP found for this phone number" });
  }

  if (Date.now() > record.expiresAt) {
    return res.status(400).json({ success: false, message: "OTP expired" });
  }

  if (record.otp.toString().trim() !== otp.toString().trim()) {
    return res.status(400).json({ success: false, message: "Incorrect OTP" });
  }

  delete otpStore[phone];
  console.log(`✅ Phone OTP verified for ${phone}`);
  res.status(200).json({ success: true });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Something went wrong!',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 404 handler for API routes
app.use('/api/*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'API endpoint not found'
  });
});

// // ✅ Serve frontend for all routes (React Router fallback)
// app.use(express.static(path.join(__dirname, "dist"))); // Adjust if using Vite or CRA

// Root endpoint for backend API
app.get('/', (req, res) => {
  res.json({ 
    message: 'Backend API is running!', 
    status: 'success',
    timestamp: new Date(),
    endpoints: {
      health: '/api/health',
      contact: '/api/contact/*',
      book: '/api/book/*',
      sendOtp: '/api/send-otp',
      verifyOtp: '/api/verify-otp'
    }
  });
});

// ✅ Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
});
