const bcrypt = require('bcryptjs');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const agenda = require('../agenda'); // Import Agenda instance

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'info@hacfy.com',
    pass: 'QAZmlp1@*?)0',
  },
});

const signUp = async (req, res) => {
  const { fullName, email, phone, password } = req.body;

  if (!fullName || !email || !phone || !password) {
    return res.status(400).json({ message: 'Please fill all fields' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = Math.floor(100000 + Math.random() * 900000).toString();

    // Create new user
    const user = new User({
      fullName,
      email,
      phone,
      password: hashedPassword,
      verified: false,
      verificationToken,
    });

    await user.save();

    await transporter.sendMail({
      from: 'info@hacfy.com',
      to: email,
      subject: 'Email Verification',
      html: `<h3>Hello ${fullName},</h3><p>This is your OTP for email verification:</p> 
        <p>${verificationToken}</p>`,
    });

    await agenda.schedule('in 1 hr', 'delete unverified user', { email });

    res.status(201).json({ message: 'User registered successfully', email });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ message: 'Error registering user', error });
  }
};

module.exports = signUp;
