const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
require("dotenv").config();


exports.signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email already exists" });
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    const newUser = new User({ name, email, password: hash });
    const savedUser = await newUser.save();
    const token = jwt.sign({ id: savedUser._id }, process.env.JWT_SECRET, {
      expiresIn: 3600
    });
    res.status(200).json({
      token,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });
  } catch (error) {
    res.status(500).json({ error });
  }
};
