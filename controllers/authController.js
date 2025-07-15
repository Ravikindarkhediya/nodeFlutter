const User = require('../models/User');
const bcrypt = require('bcryptjs');

// todo: Login
exports.loginPost = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).json({ error: 'User not found' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

        return res.json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: 'Server error' });
    }
};

// todo: Register
exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        console.log(' Registration payload:', req.body);

        await User.create({ email, password });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        console.error(' Registration Error:', err.message);
        if (err.code === 11000) {
            return res.status(400).json({ error: 'Email already exists' });
        }
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginGet = (req, res) => {
    res.send('<h1>nodeFlutter</h1>')
}