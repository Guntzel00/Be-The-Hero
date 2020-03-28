const express = require('express'); // Importing express.js library

const ngoController = require('./controllers/ngoController'); // Importing ngos Controllers
const incidentController = require('./controllers/incidentController'); // Importing incidents Controllers
const profileController = require('./controllers/profileController'); // Importing profile Controllers
const sessionController = require('./controllers/sessionController'); // Importing session Controllers

const routes = express.Router();

// Setting routes for session actions
routes.post('/sessions', sessionController.create);

// Setting routes for ngo's actions using an async funcs
routes.get('/ngos', ngoController.index);
routes.post('/ngos', ngoController.create);

// Setting routes for incidents actions using an async funcs
routes.get('/incidents', incidentController.index);
routes.post('/incidents', incidentController.create);
routes.delete('/incidents/:id', incidentController.delete);

// Setting router for profile actions using async funcs
routes.get('/profile', profileController.index);
module.exports = routes; // Exporting routes
