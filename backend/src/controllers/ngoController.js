const crypto = require('crypto'); // Importing Crypto library that comes by default with node.js to genrate an ID
const connection = require('../database/connection'); // Importing connection variable to communicate with the DB
const generateUniqueId = require('../utils/generateUniqueId');

module.exports = {
  async index(request, response) {
    const ngos = await connection('ngos').select('*'); // Selecting all the ngos info in our DB

    return response.json(ngos); // Sending ngos info in JSON format
  },

  async create(request, response) {
    const { name, email, whatsapp, city, pa } = request.body; // Destructuring body request

    const id = generateUniqueId(); //  Generating ngo ID

    await connection('ngos').insert({
      // Calling our connection with the DB and inserting our body request data inside our ngos Table
      id,
      name,
      email,
      whatsapp,
      city,
      pa
    });

    return response.json({ id }); // responding back with the ngo ID to future login
  }
};
