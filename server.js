'use strict';

const express = require(`express`);

const mongojs = require(`mongojs`);

const logger = require(`morgan`);

const app = express();

const dbName = `workouts`;

const collections = [`exercises`];

const db = mongojs(dbName, collections);

db.on(`error`, error => {
    console.log(`Database Error:`, error);
});

app.get(`/all`,)