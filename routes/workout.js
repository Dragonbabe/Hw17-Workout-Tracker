'use strict';

module.exports = app => {

const Workout = require(`../models/Workout`);

app.post(`/api/workouts`, ({body}, res) => {
    Workout.create(body)
    .then(dbExercise => res.json(dbExercise))
    .catch(err => res.status(400).json(err));
    });

app.post(`/api/workouts`, ({ body }, res) => {
    Workout.insertOne(body)
    .then(dbExercise => res.json(dbExercise))
    .catch(err => res.status(400).json(err)); 
});
app.put(`/api/workouts`, ({body}, res) => {
Workout.updateOne(body)
.then(dbExercise => res.json(dbExercise))
.catch(err => res.status(400).json(err));
});

app.get(`/api/workouts`, (req, res) => {
        Workout.find({})
        .then(dbExercise => res.json(dbExercise))
        .catch(err => res.status(400).json(err));
    });
};