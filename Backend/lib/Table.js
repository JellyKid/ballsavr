const router = require('express').Router();
const checkAuth = require('./auth/checkAuth');
const getCurrentUser = require('./db/getCurrentUser');
const isAdmin = require('./auth/isAdmin');
const getCurrentTablesDB = require('./db/getCurrentTables');
const findTableByName = require('./table/findTableByName');
const findByIdAndUpdate = require('./table/findByIdAndUpdate');
const jsonParser = require('body-parser').json();

router.all(
  '/table/*',
  checkAuth
);

router.all(
  'table/admin/*',
  getCurrentUser,
  isAdmin
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
  (req,res) => res.status(200).send(res.locals.searchResults)
);

router.post(
  '/table/admin/disable',
  jsonParser,
  (req,res,next) => {
    res.locals.ids = req.body;
    res.locals.updates = {enabled: false};
    next();
  },
  findByIdAndUpdate,
  getCurrentTablesDB,
  (req,res) => res.status(200).send({
    status: 200,
    payload: res.locals.currentTables
  })
);

router.post(
  '/table/admin/enable',  
  jsonParser,
  (req,res,next) => {
    res.locals.ids = req.body;
    res.locals.updates = {enabled: true};
    next();
  },
  findByIdAndUpdate,
  getCurrentTablesDB,
  (req,res) => res.status(200).send({
    status: 200,
    payload: res.locals.currentTables
  })
);


module.exports = router;
