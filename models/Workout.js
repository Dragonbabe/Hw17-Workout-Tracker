'use strict';

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    day: {
        type: Date,
        default: Date.now()
    },
   
    exercises: [
        {
          type: Object,
          name: {type: String, required: true},
          weight: Number,
            reps: Number,
            sets: Number,
          duration: Number,
          distance: Number
        }
      ],
    });

  
    
module.exports = mongoose.model(`Workout`, WorkoutSchema);