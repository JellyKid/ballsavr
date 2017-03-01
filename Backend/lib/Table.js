const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const getCurrentTablesDB = require('./db/getCurrentTables');
const findTableByName = require('./table/findTableByName');

router.all(
  '/table/*'
  // checkAuth
);

router.get(
  '/table/current',
  getCurrentTablesDB,
  (req,res) => res.status(200).send({
    status: 200,
    payload: res.locals.currentTables
  })
);

router.get(
  '/table/search/:query',
  findTableByName,
  (req,res) => res.status(200).send({
    status: 200,
    payload: res.locals.searchResults
  })
);

module.exports = router;
