// controllers/authController.js

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const mongoose = require('mongoose');
const User = require('../models/User');

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  User.findOne({ email }, async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(400).json({ error: "User with this email doesn't exist" });
    }

    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    const transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: email,
      subject: 'Password Reset Request',
      html: `
        <p>You are receiving this email because you (or someone else) have requested the reset of the password for your account.</p>
        <p>Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:</p>
        <p><a href="${process.env.CLIENT_URL}/reset-password/${token}">Reset Password Link</a></p>
        <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>
      `,
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error(error);
        return res.status(500).json({ error: 'Failed to send email' });
      }
      return res.status(200).json({ message: 'Password reset link sent successfully' });
    });
  });
};

const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;
  if (!token || !newPassword) {
    return res.status(400).json({ error: 'Token and newPassword are required' });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  if (!decoded) {
    return res.status(400).json({ error: 'Invalid token' });
  }

  User.findOne({ email: decoded.email }, async (err, user) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal server error' });
    }

    if (!user) {
      return res.status(400).json({ error: "User doesn't exist" });
    }

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(newPassword, salt);
    await user.save();

    return res.status(200).json({ message: 'Password updated successfully' });
  });
};

module.exports = {
  forgotPassword,
  resetPassword,
};
