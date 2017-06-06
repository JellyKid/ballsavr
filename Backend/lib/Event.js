const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const jsonParser = require('body-parser').json();
const saveEvent = require('./events/saveEvent');
const getEvents = require('./events/getEvents');
const saveRounds = require('./events/saveRounds');
const getRoundsByEventID = require('./events/getRoundsByEventID');
const removeEventByID = require('./events/removeEventByID');
const removeRoundsByEventID = require('./events/removeRoundsByEventID');
const currentRoundsByUser = require('./events/currentRoundsByUser');
const updateEventWithRounds = require('./events/updateEventWithRounds');
const saveTotals = require('./events/saveTotals');
const deleteUnmatchedTotals = require('./events/deleteUnmatchedTotals');
const getRoundByID = require('./events/getRoundByID');
const deleteUnmatchedRounds = require('./events/deleteUnmatchedRounds');
const currentRounds = require('./events/currentRounds');

router.all(
  '/event/*',
  checkAuth
);

router.post(
  '/admin/event',
  jsonParser,
  saveEvent,
  saveRounds,
  deleteUnmatchedRounds,
  updateEventWithRounds,
  saveTotals,
  deleteUnmatchedTotals,
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

router.delete(
  '/event/:event',
  removeEventByID,
  removeRoundsByEventID,
  (req, res) => {
    return res.status(200).send({status:200});
  }
);

router.get(
  '/rounds/current',
  //currentRoundsByUser,
  currentRounds,
  (req,res) => res.status(200).send(
    {
      status:200,
      payload: res.locals.rounds
    }
  )
);

router.get(
  '/round/:id',
  getRoundByID,
  (req,res) => res.status(200).send(
    {
      status:200,
      payload: res.locals.round
    }
  )
);


module.exports = router;
