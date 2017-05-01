const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const getTotalsByRoundID = require('./score/getTotalsByRoundID');
const getScoresFromRound = require('./score/getScoresFromRound');
const submitScore = require('./score/submitScore');
const jsonParser = require('body-parser').json();
const confirmScore = require('./score/confirmScore');
const tallyAndPush = require('./score/tallyAndPush');
const tallyProgress = require('./events/tallyProgress');

router.all(
  '/score/*',
  checkAuth
);

router.get(
  '/score/totals',
  getTotalsByRoundID,
  (req, res) => res.status(200).send({
    status: 200,
    payload: res.locals.totals
  })
);

router.get(
  '/score/round',
  getScoresFromRound,
  (req, res) => res.status(200).send({
    status: 200,
    payload: res.locals.scores
  })
);

router.post(
  '/score',
  jsonParser,
  submitScore,
  tallyProgress,
  tallyAndPush,
  (req, res) => res.status(200).send({status: 200})
);

router.get(
  '/score/confirm/:id',
  confirmScore,
  tallyProgress,
  tallyAndPush,
  (req, res) => res.status(200).send({status:200})
);

module.exports = router;
