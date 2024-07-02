const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user");
const router = express.Router();
const JWT_SECRET = process.env.JWT_SECRET || "your_default_secret";

router.post("/signup", async (req, res) => {
  try {
    const { login, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ login, password: hashedPassword });
    await user.save();
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error creating user", error });
  }
});

router.post("/signin", async (req, res) => {
  try {
    const { login, password } = req.body;
    const user = await User.findOne({ login });
    if (!user) return res.status(401).json({ message: "Invalid login" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user._id }, JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

module.exports = router;
