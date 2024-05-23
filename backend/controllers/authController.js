const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models').User;
require('dotenv').config();

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
      const hashedPassword = await bcrypt.hash(password, 10);
      const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });
      const user = await User.create({
        email,
        password: hashedPassword,
        verificationToken,
      });
  
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL,
          pass: process.env.EMAIL_PASSWORD,
        },
      });
  
      const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Email Verification',
        text: `Please verify your email by clicking on the following link: ${process.env.FRONTEND_URL}/verify/${verificationToken}`,
      };
  
      await transporter.sendMail(mailOptions);
      
      // Redirect to login page after successful registration
      res.status(201).json({ message: 'User registered. Please check your email for the verification link.', redirectTo: '/login' });
    } catch (error) {
      console.error('Error registering user:', error);
      res.status(500).json({ message: 'Error registering user', error: error.message });
    }
  };
  

exports.verify = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(404).json({ message: 'User not found' });
    // if (user.isVerified) return res.status(400).json({ message: 'User already verified' });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Email verified successfully' });
  } catch (error) {
    console.error('Error verifying email:', error);  // Log the error
    res.status(500).json({ message: 'Error verifying email', error: error.message });
  }
};
