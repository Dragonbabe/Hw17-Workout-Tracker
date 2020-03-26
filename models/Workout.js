'use strict';

const mongoose = require(`mongoose`);

const Schema = mongoose.Schema;

const WorkoutSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    exercise: [
        {
    type: Schema.Types.ObjectId,
    ref: `Exercise`
        }
    ]
});

module.exports = mongoose.model(`Workout`, WorkoutSchema);