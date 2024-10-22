import Training from "../models/trainingModel.js";

const addTraining = async (req, res) => {
  const { name, category, company, timePeriod, goals } = req.body; // Include 'goals'

  try {
    const newTraining = new Training({
      name,
      category,
      company,
      timePeriod,
      goals, // Save the goals array
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

const updateTrainingById = async (req, res) => {
  const { isCompleted, goals } = req.body; // Include 'goals' in the update request

  try {
    const training = await Training.findById(req.params.id);

    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    // Update fields conditionally
    if (isCompleted !== undefined) {
      training.isCompleted = isCompleted;
    }

    if (goals !== undefined) {
      training.goals = goals; // Update goals
    }

    // Save the updated training document
    const updatedTraining = await training.save();
    res.status(200).json(updatedTraining);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

const updateGoalSubmission = async (req, res) => {
  const { index, submission } = req.body;
  const { id } = req.params;

  try {
    const training = await Training.findById(id);

    if (!training) {
      return res.status(404).json({ message: 'Training not found' });
    }

    // Assuming you want to add submission to the goals
    if (!training.submissions) {
      training.submissions = []; // Initialize submissions if not present
    }

    // Ensure submissions array is the same length as goals
    while (training.submissions.length < training.goals.length) {
      training.submissions.push(''); // Fill with empty strings for new goals
    }

    training.submissions[index] = submission; // Update the submission for the specific goal

    const updatedTraining = await training.save();
    res.status(200).json(updatedTraining);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: 'Server Error' });
  }
};

export { addTraining, getTrainings, getTrainingById, updateTrainingById, updateGoalSubmission};
