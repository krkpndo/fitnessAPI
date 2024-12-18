const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,  // duration in minutes
    required: true,
  },
  status: {
    type: String,
    enum: ['completed', 'pending'],
    required: true,
  },
  dateAdded: {
    type: Date,
    default: Date.now,
  }
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;
