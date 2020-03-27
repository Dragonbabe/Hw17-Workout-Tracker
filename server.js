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

app.get(`./populated`, (req, res) => {
    db.Workout.find({})
    .populate(`exercise`)
    .then(dbExercise => {
        res.json(dbExercise);
    })
    .catch(err => {
        res.json(err);
    })
})
app.use(require('./routes/html.js'));
app.use(require('./routes/workout.js'));

app.listen(PORT, () => {
    console.log(`App listening on http://localhost:${PORT}`);
  });
  