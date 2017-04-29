const express = require('express');

const router = express.Router();

const data = [
  {
    id: 1,
    username: 'vibert',
  },
  {
    id: 2,
    username: 'shinyi',
  },
];

router.get('/', (req, res) => {
  // Comment out this line:
  // res.send('respond with a resource');

  // And insert something like this instead:
  res.json(data);
});

module.exports = router;
