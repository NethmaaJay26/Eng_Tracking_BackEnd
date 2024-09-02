// controllers/engineerController.js

import Engineer from '../models/engineerModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { response } from "express";
import Sengineer from '../models/SengineerModel.js';


// Add a new engineer
const addEngineer = async (req, res) => {
  const { name, traineeID, role, email, address, contact, password, supervisingEngineer } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    // Hash the password before saving
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Find the supervising engineer by ID
    const supervisingEngineerDoc = await Sengineer.findById(supervisingEngineer);
    if (!supervisingEngineerDoc) {
      return res.status(400).json({ message: 'Supervising Engineer not found' });
    }

    const newEngineer = new Engineer({
      name,
      traineeID,
      role,
      email,
      address,
      contact,
      photo,
      supervisingEngineer: supervisingEngineer, // Use ID directly
      password: hashedPassword,
    });

    const savedEngineer = await newEngineer.save();
    res.status(201).json(savedEngineer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all engineers
const getEngineers = async (req, res) => {
  try {
    const engineers = await Engineer.find();
    res.status(200).json(engineers);
    
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

//get engineer by id
const getEngineerById = async (req, res) => {
  try {
    const engineer = await Engineer.findById(req.params.id).populate('supervisingEngineer', 'name');
    if (!engineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }
    res.status(200).json(engineer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


// login Engineer
const loginEngineer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const engineer = await Engineer.findOne({ email });
    if (!engineer) {
      return res.json({ success: false, message: "User Does not Exist" });
    }

    const isMatch = await bcrypt.compare(password, engineer.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = createToken(engineer._id);
    res.json({
      success: true,
      token,
      name: engineer.name,
      address: engineer.address,
      password: engineer.password,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};


// Update password
const updatePassword = async (req, res) => {
  const { password } = req.body;
  const userId = req.user._id; // Assuming user ID is retrieved from the token

  try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      await Engineer.findByIdAndUpdate(userId, { password: hashedPassword });

      res.status(200).json({ message: 'Password updated successfully' });
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ message: 'Server Error' });
  }
};

// Update engineer
const updateEngineer = async (req, res) => {
  const { name, traineeID, role, email, address, contact, supervisingEngineer } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const updatedData = {
      name,
      traineeID,
      role,
      email,
      address,
      contact,
      supervisingEngineer,
      photo
    };

    const updatedEngineer = await Engineer.findByIdAndUpdate(req.params.id, updatedData, { new: true });
    if (!updatedEngineer) {
      return res.status(404).json({ message: 'Engineer not found' });
    }
    res.status(200).json(updatedEngineer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
};


export { addEngineer, getEngineers, loginEngineer, updatePassword, getEngineerById , updateEngineer  };
