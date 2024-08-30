// controllers/engineerController.js

import Engineer from '../models/engineerModel.js';


// Add a new engineer
const addEngineer = async (req, res) => {
  const { name, traineeID, role, email, address, contact } = req.body;
  const photo = req.file ? req.file.filename : null;

  try {
    const newEngineer = new Engineer({
      name,
      traineeID,
      role,
      email,
      address,
      contact,
      photo,
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

export { addEngineer, getEngineers };
