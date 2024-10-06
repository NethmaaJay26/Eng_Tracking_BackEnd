// models/engineerModel.js

import mongoose from 'mongoose';

const engineerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  traineeID: {
    type: String,
    required: true,
    unique: true,
  },
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
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
  password: {
    type: String,
    required: true,
  },
  supervisingEngineer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Sengineer',
    required: false,
  },
  training: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the Training model
    ref: 'Training',
    required: false,
  }
});

const Engineer = mongoose.model('Engineer', engineerSchema);

export default Engineer;
