const User = require('../models/User');
const bcrypt = require('bcryptjs');

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

exports.register = async (req, res) => {
    const { email, password } = req.body;
    try {
        const hashed = await bcrypt.hash(password, 10);
        await User.create({ email, password: hashed });
        res.status(201).json({ message: 'User created' });
    } catch (err) {
        res.status(500).json({ error: 'Registration failed' });
    }
};

exports.loginGet = (req, res) => {
    res.send('<h1>nodeFlutter</h1>')
}