const jwt = require('jsonwebtoken');
require('dotenv').config();

const Student = require('../models/Student');
const Tutor = require('../models/Tutor');
const Admin = require('../models/Admin');

const registerUser = async (req, res) => {
  try {
    console.log("Received signup data:", req.body);
    const { name, email, password, role } = req.body;
    
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please provide all required fields.' });
    }
    
    const nameParts = name.trim().split(" ");
    const firstName = nameParts[0];
    const lastName = nameParts.length > 1 ? nameParts.slice(1).join(" ") : "N/A";
    
    const existingUser = await Student.findOne({ email }) ||
                         await Tutor.findOne({ email }) ||
                         await Admin.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User with this email already exists.' });
    }
    
    let user;
    if (role === 'tutor') {
      user = new Tutor({ username: email, password, email, role, firstName, lastName });
    } else if (role === 'admin') {
      user = new Admin({ username: email, password, email, role, firstName, lastName });
    } else {
      user = new Student({ username: email, password, email, role: 'student', firstName, lastName });
    }
    
    await user.save();
    res.status(201).json({ message: 'User registered successfully.' });
  } catch (err) {
    console.error("Error in registerUser:", err);
    res.status(500).json({ message: 'Error registering user.', error: err.message });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
  
    let user = await Student.findOne({ email });
    if (!user) {
      user = await Tutor.findOne({ email });
    }
    
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
   
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    
    res.status(200).json({ message: 'Login successful.', token, user });
  } catch (err) {
    console.error("Error in loginUser:", err);
    res.status(500).json({ message: 'Error during login.', error: err.message });
  }
};


const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;
    
   
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    
    if (admin.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials.' });
    }
    
    const token = jwt.sign({ id: admin._id, role: admin.role }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });
    
    res.status(200).json({ message: 'Admin login successful.', token, admin });
  } catch (err) {
    console.error("Error in loginAdmin:", err);
    res.status(500).json({ message: 'Error during admin login.', error: err.message });
  }
};

module.exports = { registerUser, loginUser, loginAdmin };
