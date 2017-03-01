const router = require('express').Router();

const checkAuth = require('./auth/checkAuth');
const logout = require('./auth/logout');
const login = require('./auth/login');

const getCurrentUserDB = require('./db/getCurrentUser');
const getUserByToken = require('./db/getUserByToken');

const stripHash = require('./user/stripHash');
const register = require('./user/register');


router.all(
  '/user/*',
  checkAuth
);

router.get(
  '/user/current',
  getCurrentUserDB,
  stripHash,
  (req,res) => res.status(200).send({
    status: 200,
    user: res.locals.currentUser
  })
);

router.get(
  '/logout',
  logout,
  (req,res) => res.redirect('/')
);

router.get(
  '/token',
  getUserByToken,
  stripHash, //if sending back across the web make sure to always strip hash
  (req, res) => res.status(200).send(res.locals.user)
);

router.post(
  '/register',
  register,
  login,
  (req,res) => res.status(200).send({
    status: 200,
    message: `Welcome ${res.locals.user.firstName} to Tricity Pinball!`
  })
);


module.exports = router;
