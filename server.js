'use strict';
//INSTALL DEPENDENCIES
const express = require(`express`);

const logger = require(`morgan`);

const mongoose = require(`mongoose`);

const PORT = process.env.PORT || 8080;

const db = require(`./models`);

const app = express();

//MIDDLEWARE!
app.use(logger(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

mongoose.connect(process.env.MONGODB_URI || `mongodb://localhost/populate`, {
    useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
  useFindAndModify: false
});

db.Workout.create({ name: `Workout`})
.then(dbWorkout => {
    console.log(dbWorkout);
})
.catch(({message}) => {
    console.log(message)
});

app.post(`/submit`, ({body}, res) => {
    db.Exercise.create(body)
    .then(({ _id }) => 
        db.Workout.findOneAndUpdate(
            {},
            { $push: { exercise: _id} },
            {
                new: true
            })
        ) 
        .then(dbWorkout => {
            res.json(dbWorkout);
        })
        .catch(err => {
            res.json(err);
        });
});

app.listen(PORT, () => {
    console.log(`App running on http://localhost:${PORT}`);
  });
  