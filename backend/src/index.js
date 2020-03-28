const express = require('express');
const cors = require('cors');
const routes = require('./routes');

const app = express();

app.use(cors());
app.use(express.json()); // Transform JSON format into JS objects
app.use(routes);

app.listen(3333); // Setting the port
