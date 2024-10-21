// Unified login controller for HR, Engineer, and Supervising Engineer
import UserModel from "../models/userModel.js";
import EngineerModel from "../models/engineerModel.js";
import SEngineerModel from "../models/SengineerModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const loginUnified = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Search HR collection
    let user = await UserModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password for HR" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token, role: "hr", user });
    }

    // Search Engineer collection
    user = await EngineerModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password for Engineer" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ 
        success: true, 
        token, 
        role: "engineer", 
        user: {
          ...user._doc,  
          password: password // Send the plain password (not recommended for real-world apps)
        } 
      });
    }
    // Search Supervising Engineer collection
    user = await SEngineerModel.findOne({ email });
    if (user) {
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.json({ success: false, message: "Invalid password for Supervising Engineer" });
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ success: true, token, role: "supervising-engineer", user });
    }

    // If no user found
    return res.json({ success: false, message: "User not found" });

  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Server error" });
  }
};

export { loginUnified };
