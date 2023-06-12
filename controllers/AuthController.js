import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

//Register Controller
export const RegisterController = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    // Checking if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" });
    }

    // Creating a new user instance
    const user = new User({
      username,
      email,
      password,
      confirmPassword,
      // Setting the isAdmin field to the desired value
    });

    // Generate a salt and hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Setting the hashed password on the user object and saving it to the database
    user.password = hashedPassword;
    user.confirmPassword = hashedPassword;

    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);

    await user.save();

    res.status(201).json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: "Internal server error" });
  }
};

//Login Controller

export const LoginController = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password does not match" });
    }
    const token = jwt.sign({ userId: user._id }, process.env.SECRET_KEY);
    res.json({
      user,
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
