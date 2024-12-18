const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const workoutRoutes = require('./routes/workoutRoutes');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());

// Routes
app.use('/users', authRoutes);
app.use('/workouts', workoutRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on port ${process.env.PORT || 3000}`);
    });
  })
  .catch(err => {
    console.log('Failed to connect to MongoDB:', err);
  });
