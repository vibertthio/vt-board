const express = require('express');

const router = express.Router();
const lo = 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.';
let data = [
  {
    id: 0,
    userName: 'vibert',
    time: '2017/4/2, 13:05',
    content: lo,
    reply: [
      {
        userName: 'man',
        time: '2017/4/2, 14:25',
        content: lo,
      },
      {
        userName: 'woman',
        time: '2017/4/2, 15:15',
        content: 'hello back to vibert',
      },
    ],
  },
  {
    id: 1,
    userName: 'shinyi',
    time: '2017/4/3, 9:02',
    content: lo,
    reply: [
      {
        userName: 'man',
        time: '2017/4/3, 10:00',
        content: 'hello back to vibert',
      },
      {
        userName: 'woman',
        time: '2017/4/3, 11:05',
        content: 'hello back to vibert',
      },
    ],
  },
];

router.get('/', (req, res) => {
  res.json(data);
});

router.post('/', (req, res) => {
  const c = req.body;
  const d = new Date();
  const time = `${d.getYear() + 1900}/${d.getMonth() + 1}/${d.getDate()}, ${d.getHours()}:${(d.getMinutes() > 10) ? '' : '0'}${d.getMinutes()}`;
  const comment = {
    id: c.commentCount,
    userName: c.inputUserName,
    time,
    content: c.inputComment,
    reply: [],
  };
  data = data.concat(comment);
  res.send(comment);
});

module.exports = router;
