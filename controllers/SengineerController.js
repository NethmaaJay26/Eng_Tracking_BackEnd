// controllers/SengineerController.js

import Sengineer from '../models/SengineerModel.js';

// Add a new supervising engineer
const addSupervisingEngineer = async (req, res) => {
  const { name, traineeID, role, email, address, contact } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const newSengineer = new Sengineer({
      name,
      traineeID,
      role,
      email,
      address,
      contact,
      photo,
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

export { addSupervisingEngineer, getSupervisingEngineers };
