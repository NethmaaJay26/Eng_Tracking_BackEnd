
import mongoose from "mongoose";

const trainingSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
    },

    category: {
        type: String,
        required: true,
    },

    company: {
        type: String,
        required: true,
    },

    timePeriod: {
        type: String,
        required: true,
    },

    Goals: {
        type: String,
        required: true,
    },
});

const Training = mongoose.model('Training', trainingSchema);

export default Training;
