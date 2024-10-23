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
  goals: [goalSchema],  // Sub-schema for goals

  marks: {
    type: Number,  // Marks field
    min: 0,
    max: 10,
    default: null,
  },

  // Field to store PDF metadata (file URL and MIME type)
  pdfFile: {
    url: String,       // URL to the uploaded PDF file (could be cloud storage or local path)
    contentType: String,  // Content type (e.g., 'application/pdf')
  },
});

const Training = mongoose.model('Training', trainingSchema);

export default Training;
