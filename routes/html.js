'use strict';

const router = require(`express`).Router();

const Workout = require(`../models/Workout`);

router.get(`/exercise`, (req, res) => {
    Workout.find({})
    .then(dbExercise => res.json(dbExercise))
        .catch(err => res.status(400).json(err));
});

module.exports = router;