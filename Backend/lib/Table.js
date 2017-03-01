const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const getCurrentTablesDB = require('./db/getCurrentTables');

router.all(
  '/table/*',
  checkAuth
);

router.get(
  '/table/current',
  getCurrentTablesDB,
  (req,res) => res.status(200).send({
    status: 200,
    payload: res.locals.currentTables
  })
);

module.exports = router;
