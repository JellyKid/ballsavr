const router = require('express').Router();
const getUsers = require('./db/getUsers');
const parseForm = require('multer')().none();
const Admin = require('./admin/index');


router.all(
  '/admin/*',
  Admin.check
);

router.post(
  '/admin/invite',
  parseForm,
  Admin.addUser,
  Admin.emailInvite,
  Admin.updateUser,
  (req,res) => res.status(200).send({
    status: 200,
    message: `Invitation sent to ${res.locals.user.email}`,
    redirect: '/'
  })
);

router.get(
  '/admin/syncIPDB',
  Admin.syncTables,
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
  Admin.updateUser,
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
