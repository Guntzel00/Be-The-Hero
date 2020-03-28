const knex = require('knex'); // Importing knex library
const configuration = require('../../knexfile'); // Importing th DB configuration inside our knexfile

const connection = knex(configuration.development); //Passind the development connection as a parameter

module.exports = connection; // exporting connection variable to comunicate with the DB
