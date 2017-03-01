const router = require('express').Router();
const getCurrentUser = require('./db/getCurrentUser');
const isAdmin = require('./auth/isAdmin');
const inviteUser = require('./admin/inviteUser');

router.all(
  '/admin/*',
  getCurrentUser,
  isAdmin
);

router.post(
  '/admin/invite',
  inviteUser
);


module.exports = router;
