const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');

// Routes
const home = require('./src/routes/home');
const webhooks = require('./src/routes/webhooks');

const initDB = require('./src/init-db');

// Get env variables
const { NODE_ENV, PORT = 3000, MONGO_URL } = process.env;

// Log env variables
console.log(
  '\nNODE_ENV', NODE_ENV,
  '\nPORT', PORT,
  '\nMONGO_URL', MONGO_URL,
);

// Init node app
const app = express();

// Middlewares
app.use(helmet());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Connect DB
mongoose.connect(MONGO_URL, { useNewUrlParser: true });
mongoose.Promise = global.Promise;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'Connection error:'));
db.once('open', console.log.bind(console, `Database connected to ${MONGO_URL}`));

// Populate DB
initDB();

// Routes
app.use('/', home);
app.use('/webhook', webhooks);

// Listen
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT} ...`);
});
