import Training from "../models/trainingModel.js";

const addTraining = async (req, res) => {
    const { name, category, company, timePeriod, Goals } = req.body;

    try {
        const newTraining = new Training({
            name,
            category,
            company,
            timePeriod,
            Goals
        });

        const savedTraining = await newTraining.save();
        res.status(201).json(savedTraining);

    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
};

const getTrainings = async (req, res) => {
    try {
        const trainings = await Training.find();
        res.status(200).json(trainings);
    } catch (err) {
        console.error(err.message);
        res.status(500).json('Server Error');
    }
};

export { addTraining, getTrainings };
