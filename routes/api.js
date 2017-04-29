const express = require('express');

const router = express.Router();

const data = [
  {
    id: 1,
    username: 'vibert',
    time: new Date(2017, 3, 29, 9, 11, 47),
    content: 'hello world frome vibert',
    reply: [
      {
        username: 'man',
        time: new Date(2017, 3, 29, 10, 9, 8),
        content: 'hello back to vibert',
      },
      {
        username: 'woman',
        time: new Date(2017, 3, 29, 10, 9, 8),
        content: 'hello back to vibert',
      },
    ],
  },
  {
    id: 2,
    username: 'shinyi',
    time: new Date(2017, 3, 29, 10, 1, 3),
    content: 'hello world from shinyi',
    reply: [
      {
        username: 'man',
        time: new Date(2017, 3, 29, 10, 9, 8),
        content: 'hello back to vibert',
      },
      {
        username: 'woman',
        time: new Date(2017, 3, 29, 10, 9, 8),
        content: 'hello back to vibert',
      },
    ],
  },
];

router.get('/', (req, res) => {
  res.json(data);
});

router.post('/', (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

module.exports = router;
