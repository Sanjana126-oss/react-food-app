const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// 1. REGISTER
exports.register = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const exists = await User.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role: "user" // Force "user" for public registrations
        });

        const user = await newUser.save();
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        // Send role back so frontend can redirect if needed
        res.json({ success: true, token, name: user.name, role: user.role });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

// 2. LOGIN
exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.json({ success: false, message: "User doesn't exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.json({ success: false, message: "Invalid credentials" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
        
        // CRITICAL: Send the role back to React
        res.json({ 
            success: true, 
            token, 
            name: user.name, 
            role: user.role 
        });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};