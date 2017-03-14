const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const addEvent = require('./db/addEvent');
const jsonParser = require('body-parser').json();
const getEvents = require('./events/getEvents');

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

router.get(
  '/events',
  getEvents,
  (req, res) => {
    return res.status(200).send({
      status: 200,
      payload: res.locals.events
    });
  }
);




module.exports = router;
