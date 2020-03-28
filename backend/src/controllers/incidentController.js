const connection = require('../database/connection'); // Importing connection variable to communicate with the DB

module.exports = {
  // Responsable for listening all the incidents
  async index(request, response) {
    const { page = 1 } = request.query;

    const [count] = await connection('incidents').count();

    console.log(count);

    const incidents = await connection('incidents')
      .join('ngos', 'ngos.id', '=', 'incidents.ngo_id')
      .limit(5) // Setting Numbers of incidences lmimit
      .offset((page - 1) * 5) // Jumping incidences according to page number
      .select([
        'incidents.*',
        'ngos.name',
        'ngos.whatsapp',
        'ngos.email',
        'ngos.city',
        'ngos.pa'
      ]); // Selecting all the incidents info in our DB

    response.header('X-Total-count', count['count(*)']);

    return response.json(incidents); // Sending incidents info in JSON format
  },

  // Responsable for creating an incident
  async create(request, response) {
    const { title, description, value } = request.body; // Destructuring incidents body request
    const ngo_id = request.headers.authorization; // Getting ngo_id

    const [id] = await connection('incidents').insert({
      // Inserting our destructured body request inside our incidents table
      title,
      description,
      value,
      ngo_id
    });

    return response.json({ id }); //Returning incident ID
  },

  //Responsable for deleting incidents
  async delete(request, response) {
    const { id } = request.params; // Getting incident ID
    const ngo_id = request.headers.authorization; // Getting ngo_id

    const incident = await connection('incidents') // Getting incident's ngo_id
      .where('id', id)
      .select('ngo_id')
      .first();

    //   comparing incident's ngo_id with actual ngo_id
    if (incident.ngo_id !== ngo_id) {
      return response.status(401).json({ error: 'Operation not permitted.' }); // Returning Authorization status error
    }

    await connection('incidents') // Deleting incident if confirmed ngo ownership
      .where('id', id)
      .delete();

    return response.status(204).send(); // Returning success status
  }
};
