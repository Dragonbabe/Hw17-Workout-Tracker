'use strict';

const express = require(`express`);

const mongojs = require(`mongojs`);

const app = express();

const dbName = `workouts`;

const collections = [`exercises`];