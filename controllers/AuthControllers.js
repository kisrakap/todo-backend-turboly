const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    console.log("Registering user:", { username, email }); // Debug log
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(201)
      .json({
        token,
        message: "User registered successfully",
        userId: user.id,
      });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User Tidak Ditemukan" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password Salah" });
    }
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res
      .status(200)
      .json({ token, message: "Login successful", userId: user.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
