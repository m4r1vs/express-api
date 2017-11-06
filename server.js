/*
* The entrypoint of my API.
* Its target is to help me with stuff.
* https://maniyt.de/api/API_NAME is the URL
*/

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes.js');
const helper = require('./src/helpers');
const config = require('./config.js');

const app = express();
const port = process.env.PORT || 61014;

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Check if request is encrypted
app.use('/', (req, res, next) => {
  helper.log(`Checking HTTPS of ${req.method}`, 36);
  if (req.headers['x-forwarded-proto'] && req.headers['x-forwarded-proto'] === "http") {
    res.status(403).json("Please use HTTPS");
  } else {
    next();
  }
});

app.use('/wallet/', (req, res, next) => {
  helper.log('Checking AUTH...', 36);
  if (req.query.token === config.general.token) next();
  else res.status(401).json("Authentication is required");
});

// TODO: build some middleman to have less copypasta like so much helper.log

// TODO: make some sort of authentication with OAuth2 or other API auth.

routes(app); // router is seperated and handles all requests

app.listen(port);

helper.log(`Marius' REST-API is listening on port ${port}`, 36);
