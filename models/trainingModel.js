import mongoose from 'mongoose';

const trainingSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  timePeriod: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
  goals: {
    type: [String], // Goals should be an array of strings
  },
});

const Training = mongoose.model('Training', trainingSchema);

export default Training;
