const router = require('express').Router();
const parseForm = require('multer')().none();

const localStrategy = require('./auth/localStrategy');
const facebookStrategy = require('./auth/facebookStrategy');
const logout = require('./auth/logout');
const getCurrentUserDB = require('./db/getCurrentUser');
const noUsersCheck = require('./user/noUsersCheck');

router.use(localStrategy.initialize());
router.use(localStrategy.session());

router.use(facebookStrategy.initialize());
router.use(facebookStrategy.session());

router.post(
  '/login',
  parseForm,
  localStrategy.authenticate('local'),
  (req, res) => res.status(200).send({status: 200})
);

router.get(
  '/logout',
  logout,
  (req,res) => res.redirect('/')
);

router.get(
  '/currentUser',
  noUsersCheck,
  getCurrentUserDB,
  (req,res) => res.status(200).send({
    status: 200,
    user: res.locals.currentUser
  })
);

router.get(
  '/login/facebook',
  facebookStrategy.authenticate('facebook'),
  (req,res) => res.redirect('/')
);

router.get(
  '/login/facebook/return',
  facebookStrategy.authenticate('facebook', {failureRedirect: '/login'}),
  (req,res) => res.redirect('/')
);


module.exports = router;
