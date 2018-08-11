const express = require('express');

const router = express.Router();

// Initialize bot instance / set event listeners
const bot = require('../bot');

// FB auth
router.get('/', (req, res) => {
  bot._verify(req, res);
});

// Handle FB messages
router.post('/', (req, res) => {
  bot._handleMessage(req.body);
  res.end(JSON.stringify({ status: 'ok' }));
});

module.exports = router;
