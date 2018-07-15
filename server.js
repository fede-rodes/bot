const express = require('express');

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

// Routes
server.get('/', (req, res) => {
  res.send('Hello');
  res.end();
});

// Listen
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
