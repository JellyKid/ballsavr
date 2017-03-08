const router = require('express').Router();
const getCurrentUser = require('./db/getCurrentUser');
const isAdmin = require('./auth/isAdmin');
const inviteUser = require('./admin/inviteUser');
const updateTablesFromIPDB = require('./admin/updateTablesFromIPDB');
const getUsers = require('./db/getUsers');
const parseUpdates = require('./user/parseUpdates');
const updateUser = require('./db/updateUser');
const jsonParser = require('body-parser').json();
const parseForm = require('multer')().none();

router.all(
  '/admin/*',
  getCurrentUser,
  isAdmin
);

router.post(
  '/admin/invite',
  inviteUser,
  (req,res) => res.status(200).send({
    status: 200,
    message: `Invitation sent to ${res.locals.user.email}`,
    redirect: '/'
  })
);

router.get(
  '/admin/syncIPDB',
  updateTablesFromIPDB,
  (req,res) => res.status(200).send({
    status: 200,
    message: `${res.locals.tables.length} tables updated from IPDB`,
    redirect: '/'
  })
);

router.get(
  '/admin/users',
  getUsers,
  (req, res) => res.status(200).send({
    status: 200,
    payload: res.locals.users
  })
);


router.post(
  '/admin/user',
  parseForm,
  parseUpdates,
  updateUser,
  (req, res) => res.status(200).send({
    status: 200
  })
);

module.exports = router;
