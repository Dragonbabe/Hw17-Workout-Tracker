'use strict';

const router = require(`express`).Router();

const Exercise = require(`../models/Exercise`);

router.post(`/api/exercise`, ({body}, res) => {
    Exercise.create(body)
    .then(dbExercise => res.json(dbExercise))
    .catch(err => res.status(400).json(err));
    });

router.post(`/api/exercise`, ({ body }, res) => {
    Exercise.insertMany(body)
    .then(dbExercise => res.json(dbExercise))
    .catch(err => res.status(400).json(err));
    
})

router.get(`/api/exercise`, (req, res) => {
        Exercise.find({})
        .then(dbExercise => res.json(dbExercise))
        .catch(err => res.status(400).json(err));
    });

