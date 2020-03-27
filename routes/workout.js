'use strict';

const router = require(`express`).Router();

const Workout = require(`../models/Workout`);

router.post(`/api/workouts`, ({body}, res) => {
    Workout.create(body)
    .then(dbExercise => res.json(dbExercise))
    .catch(err => res.status(400).json(err));
    });

router.post(`/api/workouts`, ({ body }, res) => {
    Workout.insertOne(body)
    .then(dbExercise => res.json(dbExercise))
    .catch(err => res.status(400).json(err));
    
})

router.get(`/api/workouts`, (req, res) => {
        Workout.find({})
        .then(dbExercise => res.json(dbExercise))
        .catch(err => res.status(400).json(err));
    });

module.exports = router;