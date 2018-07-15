const express = require('express');
const mongoose = require('mongoose');
const initDB = require('./src/init-db');

// Get env variables
const { NODE_ENV, PORT = 3000, MONGO_URL } = process.env;

// Log env variables
console.log(
  '\nNODE_ENV', NODE_ENV,
  '\nPORT', PORT,
  '\nMONGO_URL', MONGO_URL,
);

// Init node server
const server = express();

// Middlewares
server.use(express.json());

// Connect DB
mongoose.connect(MONGO_URL);
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', console.log.bind(console, `Database connected to ${MONGO_URL}`));

// Populate DB
initDB();

// Routes
server.get('/', (req, res) => {
  res.send('Hello');
  res.end();
});

// Listen
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
