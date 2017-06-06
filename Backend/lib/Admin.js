const router = require('express').Router();
const getCurrentUser = require('./db/getCurrentUser');
const isAdmin = require('./auth/isAdmin');
const updateTablesFromIPDB = require('./admin/updateTablesFromIPDB');
const getUsers = require('./db/getUsers');
const parseUpdates = require('./user/parseUpdates');
const updateUser = require('./db/updateUser');
const jsonParser = require('body-parser').json();
const parseForm = require('multer')().none();
// const Admin = require('./admin/index');


router.all(
  '/admin/*',
  Admin.check
);

router.post(
  '/admin/invite',
  Admin.inviteUser,
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

router.delete(
  '/admin/user/:id',
  Admin.deleteUser,
  (req, res) => res.status(200).send({
    status: 200,
    message: `User ${res.locals.user.firstName + res.locals.user.lastName} deleted succesfully`
  })
);

module.exports = router;
