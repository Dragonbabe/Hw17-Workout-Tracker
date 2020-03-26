'use strict';
//INSTALL DEPENDENCIES
const express = require(`express`);

const mongojs = require(`mongojs`);

const logger = require(`morgan`);

const path = require(`path`);

const app = express();
//MIDDLEWARE!
app.use(logger(`dev`));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(`public`));

const dbName = `workouts`;

const collections = [`exercises`];

const db = mongojs(dbName, collections);
//LOG AN ERROR MESSAGE IF SOMETHING GOES WRONG
db.on(`error`, error => {
    console.log(`Database Error:`, error);
});
//THIS IS TO CONNECT ALL HTML FILES WITH THE HTML FILES
app.get(`/`, (req, res) => {
    res.sendFile(path.join(`${__dirname }./public/index.html`));
  });
  

//THIS IS TO VIEW ALL EXERCISES THAT HAVE BEEN LOGGED
app.get(`/all`, (req, res) => {
db.exercises.find({}, (error, data) => {
    if (error) {
        res.send(error);
    } else {
        res.json(data);
    }
});
});

app.listen(8080, () => {
    console.log(`App listening on port http://localhost:8080`);
});