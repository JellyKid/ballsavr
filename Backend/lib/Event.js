const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const addEvent = require('./db/addEvent');
const jsonParser = require('body-parser').json();


router.all(
  '/event/*',
  checkAuth
);

router.post(
  '/admin/event',
  jsonParser,
  addEvent,
  (req, res) => {
    return res.status(200).send({
      status: 200,
      message: `Event ${res.locals.event.title} created!`
    });
  }
);




module.exports = router;
