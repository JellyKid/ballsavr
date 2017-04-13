const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const getTotalsByRoundID = require('./score/getTotalsByRoundID');

router.all(
  '/totals/*',
  checkAuth
);

router.get(
  '/totals',  
  getTotalsByRoundID,
  (req, res) => res.status(200).send({
    status: 200,
    payload: res.locals.totals
  })
);



module.exports = router;
