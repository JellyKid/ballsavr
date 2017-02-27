const router = require('express').Router();
const checkAuth = require('../auth/checkAuth');
const getCurrentUser = require('../db/getCurrentUser');
const stripHash = require('../password/stripHash');
const logout = require('../auth/logout');

router.get(
  '/checkAuth',
  checkAuth,
  getCurrentUser,
  stripHash,
  (req,res) => res.status(200).send(res.locals.currentUser)
);

router.get(
  '/logout',
  logout
);

module.exports = router;
