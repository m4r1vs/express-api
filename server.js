/*
* The entrypoint of my API.
* Its target is to help me with stuff.
* https://maniyt.de/api/API_NAME is the URL
*/

const express = require('express');
const bodyParser = require('body-parser');
const routes = require('./src/routes.js');
const helper = require('./src/helpers');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// TODO: build some middleman to have less copypasta like so much helper.log

// TODO: make some sort of authentication with OAuth2 or other API auth.

routes(app); // router is seperated and handles all requests

app.listen(port);

helper.log(`Marius' REST-API is listening on port ${port}`, 36);
