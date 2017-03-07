const router = require('express').Router();
const parseForm = require('multer')().none();

const localStrategy = require('./auth/localStrategy');
const logout = require('./auth/logout');
const getCurrentUserDB = require('./db/getCurrentUser');
const noUsersCheck = require('./user/noUsersCheck');

router.use(localStrategy.initialize());
router.use(localStrategy.session());

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


module.exports = router;
