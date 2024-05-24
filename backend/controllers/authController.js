const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const User = require('../models').User;
require('dotenv').config();

// Registrasi pengguna
exports.register = async (req, res) => {
  const { email, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      email,
      password: hashedPassword,
      isVerified: false,
    });
    
    res.status(201).json({ message: 'Akun berhasil terdaftar. Silahkan Login untuk melakukan verfikasi email' });
  } catch (error) {
    console.error('Akun gagal terdaftar:', error);
    res.status(500).json({ message: 'Akun gagal terdaftar', error: error.message });
  }
};

// Login pengguna
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Password salah' });

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET, { expiresIn: '1d' });

    res.status(200).json({ message: 'Login berhasil', token });
  } catch (error) {
    console.error('login gagal:', error);
    res.status(500).json({ message: 'login gagal', error: error.message });
  }
};

// Verifikasi pengguna
exports.verify = async (req, res) => {
  const { token } = req.params;
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email: decoded.email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    user.isVerified = true;
    await user.save();

    res.status(200).json({ message: 'Verifikasi Email Berhasil' });
  } catch (error) {
    console.error('Gagal melakukan verifikasi email:', error);
    res.status(500).json({ message: 'Gagal melakukan verifikasi email', error: error.message });
  }
};

// Kirim ulang link verifikasi
exports.resendVerification = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(404).json({ message: 'Email tidak ditemukan' });

    const verificationToken = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1d' });

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
      subject: 'Verifikasi Email',
      text: `Silahkan lakukan verfikasi email dengan mengklik link: ${process.env.FRONTEND_URL}/verify/${verificationToken}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: 'Link verfikasi terkirim. Silahkan cek email.' });
  } catch (error) {
    console.error('Gagal mengirim link verifikasi:', error);
    res.status(500).json({ message: 'Gagal mengirim link verifikasi', error: error.message });
  }
};
