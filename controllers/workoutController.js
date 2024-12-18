const Workout = require('../models/Workout');

// Add a Workout
const addWorkout = async (req, res) => {
  const { name, duration, status } = req.body;
  try {
    const workout = new Workout({ userId: req.user._id, name, duration, status });
    await workout.save();
    res.status(201).json(workout);
  } catch (err) {
    res.status(500).json({ message: 'Error adding workout' });
  }
};

// Get all Workouts
const getMyWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ userId: req.user._id });
    res.status(200).json({workouts : workouts});
  } catch (err) {
    res.status(500).json({ message: 'Error fetching workouts' });
  }
};

// Update a Workout
const updateWorkout = async (req, res) => {
  const { workoutId } = req.params;
  const { name, duration } = req.body;
  try {
    const workout = await Workout.findOneAndUpdate(
      { _id: workoutId, userId: req.user._id },
      { name, duration },
      { new: true }
    );
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: "Workout updated successfully", updatedWorkout: workout});
  } catch (err) {
    res.status(500).json({ message: 'Error updating workout' });
  }
};

// Delete a Workout
const deleteWorkout = async (req, res) => {
  const { workoutId } = req.params;
  try {
    const workout = await Workout.findOneAndDelete({ _id: workoutId, userId: req.user._id });
    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }
    res.status(200).json({ message: 'Workout deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting workout' });
  }
};

// Complete a Workout Status
// Mark a Workout as Completed
const completeWorkout = async (req, res) => {
  const { workoutId } = req.params;

  try {
  
    // Find and update the workout
    const workout = await Workout.findOneAndUpdate(
      { _id: workoutId, userId: req.user._id },
      { status: 'completed' },
      { new: true }
    );

    if (!workout) {
      return res.status(404).json({ message: 'Workout not found' });
    }

    res.status(200).json({ message: 'Workout status updated successfully', updatedWorkout: workout });
  } catch (err) {
    console.error('Error:', err.message); 
    res.status(500).json({ message: 'Error updating workout status', error: err.message });
  }
};

module.exports = { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkout };
