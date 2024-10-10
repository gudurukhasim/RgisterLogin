const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const transporter = require('../config/email');
const connection = require('../config/db');

// Registration logic
exports.register = async (req, res) => {
  console.log('khasim')
  const { username, email, password } = req.body;
  try {
    // Check if the user already exists
   /* const [existingUser] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (existingUser.length > 0) {
      return res.status(400).json({ message: 'Email already exists' });
    }*/

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert new user into database
    const sql = 'INSERT INTO users (username, email, password) VALUES (?, ?, ?)';
    console.log(req.body)
    await connection.query(sql, [username, email, hashedPassword]);
    console.log(req.body)

    // Send registration confirmation email
    console.log(transporter)
   const gmail= await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Registration Confirmation',
      text: 'You have successfully registered!',
    });

    res.status(201).json({ message: 'User registered and email sent' });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: 'Server error' });
  }
};

// Login logic
exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user by email
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Compare the password
    const validPassword = await bcrypt.compare(password, user[0].password);
    if (!validPassword) {
      return res.status(400).json({ message: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user[0].id, email: user[0].email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send login notification email
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Login Notification',
      text: 'You have successfully logged in.',
    });

    res.status(200).json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ error });
  }
};

// Forgot password - generates OTP and sends to user's email
exports.forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    // Check if user exists
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6 digit OTP

    // Store OTP in the database (you should ideally use a more secure solution like JWT or a Redis cache)
    const otpExpireTime = new Date();
    otpExpireTime.setMinutes(otpExpireTime.getMinutes() + 10); // OTP expires in 10 minutes
    const sql = 'UPDATE users SET otp = ?, otp_expiry = ? WHERE email = ?';
    await connection.query(sql, [otp, otpExpireTime, email]);

    // Send OTP to the user's email
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset OTP',
      text: `Your OTP for password reset is: ${otp}. It will expire in 10 minutes.`,
    });

    res.status(200).json({ message: 'OTP sent to email' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};

// Reset password using OTP
exports.resetPassword = async (req, res) => {
  const { email, otp, newPassword } = req.body;

  try {
    // Find user by email
    const [user] = await connection.query('SELECT * FROM users WHERE email = ?', [email]);
    if (user.length === 0) {
      return res.status(400).json({ message: 'User with this email does not exist' });
    }

    // Check if OTP is valid and not expired
    const userOtp = user[0].otp;
    const otpExpiry = new Date(user[0].otp_expiry);
    if (otp !== userOtp) {
      return res.status(400).json({ message: 'Invalid OTP' });
    }
    if (new Date() > otpExpiry) {
      return res.status(400).json({ message: 'OTP has expired' });
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Update the user's password
    const sql = 'UPDATE users SET password = ?, otp = NULL, otp_expiry = NULL WHERE email = ?';
    await connection.query(sql, [hashedPassword, email]);

    // Send password reset confirmation email
    transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Confirmation',
      text: 'Your password has been successfully reset!',
    });

    res.status(200).json({ message: 'Password successfully reset' });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
};
