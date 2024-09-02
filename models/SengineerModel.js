// models/SengineerModel.js

import mongoose from 'mongoose';

const sengineerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  traineeID: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, 
  },
  address: {
    type: String,
    required: true,
  },
  contact: {
    type: Number,
    required: true,
  },
  photo: {
    type: String,
    required: true,
  },
  password:{
    type:String,
    required:true,
  }
});

const Sengineer = mongoose.model('Sengineer', sengineerSchema);

export default Sengineer;
