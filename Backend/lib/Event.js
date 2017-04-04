const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const jsonParser = require('body-parser').json();
const saveEvent = require('./events/saveEvent');
const getEvents = require('./events/getEvents');
const saveRounds = require('./events/saveRounds');
const getRoundsByEventID = require('./events/getRoundsByEventID');

router.all(
  '/event/*',
  checkAuth
);

router.post(
  '/admin/event',
  jsonParser,
  saveEvent,
  saveRounds,
  (req, res) => {
    return res.status(200).send({
      status: 200
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

router.get(
  '/roundsbyevent/:event',
  getRoundsByEventID,
  (req, res) => res.status(200).send({
    status: 200,
    payload: res.locals.rounds
  })
);




module.exports = router;
