const { celebrate, Segments, Joi } = require('celebrate');

const express = require('express'); // Importing express.js library

const ngoController = require('./controllers/ngoController'); // Importing ngos Controllers
const incidentController = require('./controllers/incidentController'); // Importing incidents Controllers
const profileController = require('./controllers/profileController'); // Importing profile Controllers
const sessionController = require('./controllers/sessionController'); // Importing session Controllers

const routes = express.Router();

// Setting routes for session actions
routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      id: Joi.string().required(),
    }),
  }),
  sessionController.create
);

// Setting routes for ngo's actions using an async func
routes.get('/ngos', ngoController.index);
routes.post(
  '/ngos',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      email: Joi.string().required().email(),
      whatsapp: Joi.string().required().min(11).max(11),
      city: Joi.string().required(),
      pa: Joi.string().required().length(2),
    }),
  }),
  ngoController.create
);

// Setting routes for incidents actions using an async funcs
routes.get(
  '/incidents',
  celebrate({
    [Segments.QUERY]: Joi.object().keys({
      page: Joi.number(),
    }),
  }),
  incidentController.index
);
routes.post(
  '/incidents',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      title: Joi.string().required().max(30).min(4),
      description: Joi.string().required().max(300),
      value: Joi.number().required(),
    }),
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  incidentController.create
);
routes.delete(
  '/incidents/:id',
  celebrate({
    [Segments.PARAMS]: Joi.object().keys({
      id: Joi.number().required(),
    }),
  }),
  incidentController.delete
);

// Setting router for profile actions using async funcs
routes.get(
  '/profile',
  celebrate({
    [Segments.HEADERS]: Joi.object({
      authorization: Joi.string().required(),
    }).unknown(),
  }),
  profileController.index
);
module.exports = routes; // Exporting routes
