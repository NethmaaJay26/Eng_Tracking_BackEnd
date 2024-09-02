// controllers/SengineerController.js
import Sengineer from '../models/SengineerModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import validator from "validator"
import { response } from "express";

// Add a new supervising engineer
const addSupervisingEngineer = async (req, res) => {
  const { name, traineeID, email, address, contact, password } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newSengineer = new Sengineer({
      name,
      traineeID,
      email,
      address,
      contact,
      photo,
      password: hashedPassword,
    });

    const savedSengineer = await newSengineer.save();
    res.status(201).json(savedSengineer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Get all supervising engineers
const getSupervisingEngineers = async (req, res) => {
  try {
    const sengineers = await Sengineer.find();
    res.status(200).json(sengineers);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};


// login Supervisor Engineer
const loginSengineer = async (req, res) => {
  const { email, password } = req.body;
  try {
    const sengineer = await Sengineer.findOne({ email });
    if (!sengineer) {
      return res.json({ success: false, message: "User Does not Exist" });
    }

    const isMatch = await bcrypt.compare(password, sengineer.password);

    if (!isMatch) {
      return res.json({ success: false, message: "Invalid Password" });
    }

    const token = createToken(sengineer._id);
    res.json({
      success: true,
      token,
      name: sengineer.name,
      address: sengineer.address,
      password: sengineer.password,
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({id}, process.env.JWT_SECRET)
};


export { addSupervisingEngineer, getSupervisingEngineers, loginSengineer };
