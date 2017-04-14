const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const getTotalsByRoundID = require('./score/getTotalsByRoundID');
const getScoresFromRound = require('./score/getScoresFromRound');

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

module.exports = router;
