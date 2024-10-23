import mongoose from 'mongoose';

const goalSchema = new mongoose.Schema({
  goal: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false,
  },
});

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
  goals: [goalSchema],  // Use sub-schema for goals
});

const Training = mongoose.model('Training', trainingSchema);

export default Training;
