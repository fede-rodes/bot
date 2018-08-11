const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('Hi, I\'m a 🤖');
  res.end();
});

module.exports = router;
