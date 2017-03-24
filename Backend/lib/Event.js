const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const jsonParser = require('body-parser').json();
const saveEvent = require('./events/saveEvent');
const getEvents = require('./events/getEvents');
const saveRounds = require('./events/saveRounds');

router.all(
  '/event/*',
  checkAuth
);

router.post(
  '/admin/event',
  jsonParser,
  saveEvent,
  saveRounds, //TODO make scores  
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
