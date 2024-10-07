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

const getTrainingById = async (req, res) => {
    try {
      const training = await Training.findById(req.params.id);
      if (!training) {
        return res.status(404).json({ message: 'Training not found' });
      }
      res.status(200).json(training);
    } catch (err) {
      console.error(err.message);
      res.status(500).json('Server Error');
    }
  };

export { addTraining, getTrainings, getTrainingById };
