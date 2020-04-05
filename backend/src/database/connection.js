const knex = require('knex'); // Importing knex library
const configuration = require('../../knexfile'); // Importing th DB configuration inside our knexfile

const env =
  process.env.NODE_ENV === 'test'
    ? configuration.test
    : configuration.development;

const connection = knex(configuration.development); //Passing the development connection as a parameter

module.exports = connection; // exporting connection variable to comunicate with the DB
