const express = require('express');
const { addWorkout, getMyWorkouts, updateWorkout, deleteWorkout, completeWorkout } = require('../controllers/workoutController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/addWorkout', authMiddleware, addWorkout);
router.get('/getMyWorkout', authMiddleware, getMyWorkouts);
router.put('/updateWorkout/:workoutId', authMiddleware, updateWorkout);
router.post('/completeWorkoutStatus/:workoutId', authMiddleware, completeWorkout);
router.delete('/deleteWorkout/:workoutId', authMiddleware, deleteWorkout);

module.exports = router;
