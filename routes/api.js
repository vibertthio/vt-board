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

router.post('/reply/:id', (req, res) => {
  const id = parseInt(req.params.id, 10);
  console.log(id);
  console.log(typeof (id));

  const r = req.body;
  console.log('check1');
  console.log(r.userName);
  console.log(r.content);
  console.log(r.time);
  const reply = {
    userName: r.userName,
    time: r.time,
    content: r.content,
  };
  console.log('check2');
  data[id].reply = data[id].reply.concat(reply);
  res.send(reply);
});

router.post('/comment', (req, res) => {
  const c = req.body;
  console.log(c.inputUserName);
  console.log(c.inputComment);
  console.log(c.time);
  const comment = {
    id: c.commentCount,
    userName: c.inputUserName,
    time: c.time,
    content: c.inputComment,
    reply: [],
  };
  data = data.concat(comment);
  res.send(comment);
});

module.exports = router;
