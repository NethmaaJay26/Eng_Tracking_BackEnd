import Sengineer from '../models/SengineerModel.js';
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

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

// Get a single supervising engineer by ID
const getSupervisingEngineerById = async (req, res) => {
  try {
    const sengineer = await Sengineer.findById(req.params.id);
    if (!sengineer) {
      return res.status(404).json({ message: 'Supervising Engineer not found' });
    }
    res.status(200).json(sengineer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Update supervising engineer details
const updateSupervisingEngineer = async (req, res) => {
  const { name, traineeID, email, address, contact, password } = req.body;
  const photo = req.file ? req.file.filename : req.body.photo;  // keep existing photo if no new one

  try {
    const sengineer = await Sengineer.findById(req.params.id);
    if (!sengineer) {
      return res.status(404).json({ message: 'Supervising Engineer not found' });
    }

    // Update fields
    sengineer.name = name || sengineer.name;
    sengineer.traineeID = traineeID || sengineer.traineeID;
    sengineer.email = email || sengineer.email;
    sengineer.address = address || sengineer.address;
    sengineer.contact = contact || sengineer.contact;
    sengineer.photo = photo || sengineer.photo;

    if (password) {
      const salt = await bcrypt.genSalt(10);
      sengineer.password = await bcrypt.hash(password, salt);
    }

    const updatedSengineer = await sengineer.save();
    res.status(200).json(updatedSengineer);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Delete supervising engineer
// Delete supervising engineer
const deleteSupervisingEngineer = async (req, res) => {
  try {
    const sengineer = await Sengineer.findById(req.params.id);
    if (!sengineer) {
      return res.status(404).json({ message: 'Supervising Engineer not found' });
    }
    await Sengineer.findByIdAndDelete(req.params.id);  // Use findByIdAndDelete instead of remove()
    res.status(200).json({ message: 'Supervising Engineer deleted successfully' });
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
      _id: sengineer._id
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: "Error" });
  }
};

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};

export {
  addSupervisingEngineer,
  getSupervisingEngineers,
  getSupervisingEngineerById,
  updateSupervisingEngineer,
  deleteSupervisingEngineer,
  loginSengineer
};
