const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await User.findOne({ email });
        if (existingUser) return res.status(409).json({ error: 'user already found' });
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ name, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'signup Successful' , user:user});
    } catch (err) {
        console.error('signup error', err);
        res.status(500).json({ error: 'signup failed' });
    }
}

exports.login = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email });
      if (!user) return res.status(401).json({ error: "invalid credential" });
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch)
        return res.status(401).json({ error: "invalid credential" });
      const token = jwt.sign({ id:user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });
      res.json({ messge: "login sucessful", token: token });
    } catch (err) {
      console.error("login error", err);
      res.status(500).json({ error: "login failed" });
    }
}