const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Common regex
const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_])(?!.*\s).{8,}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// REGISTER
exports.signup = async (req, res) => {
  let { name, email, password } = req.body;

  try {
    // Trim & normalize
    name = name?.trim();
    email = email?.trim().toLowerCase();

    // Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Validate email format
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    // Validate password
    if (!passwordRegex.test(password)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long, include uppercase, lowercase, number, special character, and must not contain spaces.",
      });
    }

    // Check if email exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Save user
    const user = await User.create({ name, email, password: hashedPassword });

    // Generate token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.status(201).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  let { email, password } = req.body;

  try {
    // Normalize email
    email = email?.trim().toLowerCase();

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7h",
    });

    res.status(200).json({
      token,
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// VALIDATE TOKEN
exports.validateToken = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "No token" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ user });
  } catch (err) {
    res.status(401).json({ message: "Invalid token" });
  }
};
