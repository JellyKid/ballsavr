const router = require('express').Router();

const checkAuth = require('./auth/checkAuth');
const login = require('./auth/login');
const noUsersCheck = require('./user/noUsersCheck');
const getUserByToken = require('./db/getUserByToken');
const register = require('./user/register');
const inviteUser = require('./admin/inviteUser');
const addUser = require('./db/addUser');
const hashPassword = require('./auth/hash');
const updateUser = require('./db/updateUser');
const jsonParser = require('body-parser').json();

const join = require('path').join;
const env = join(__dirname, '../../.env');
const site = require('habitat').load(env).get('SITE');

function formatFirstName(firstName) {
  return firstName.toLowerCase()
          .replace(
            /^[a-z]/,
            (match) => match.toUpperCase()
          );
}

function createFirstUserUpdates(req, res, next) {
  res.locals.updates = {
    $set: {
      hash: res.locals.hash,
      initials: req.body.initials,
      enabled: true,
      admin: true,
      "meta.activated": true
    },
    $unset: {
      "meta.verificationToken": ""
    }
  };
  return next();
}


router.get(
  '/token',
  getUserByToken,
  (req, res) => res.status(200).send(res.locals.user)
);

router.post(
  '/register',
  register,
  login,
  (req,res) => res.status(200).send({
    status: 200,
    message: `Welcome ${formatFirstName(res.locals.user.firstName)} to Tricity Pinball!`
  })
);

router.post(
  '/setup',
  jsonParser,
  noUsersCheck,
  (req, res, next) => {
    if(res.locals.nousers){return next();}
    return res.sendStatus(401);
  },
  addUser,
  hashPassword,
  createFirstUserUpdates,
  updateUser,
  login,
  (req,res) => res.status(200).send({
    status: 200,
    message: `Welcome ${formatFirstName(res.locals.user.firstName)} to Tricity Pinball!`
  })
);

router.get(
  '/info',
  (req, res) => {
    return res.status(200).send({
      status: 200,
      payload: site
    });
  }
);

// router.get(
//   '/test/:event',
//   require('./events/getRoundsByEventID'),
//   (req, res) => res.status(200).send(res.locals.rounds)
// );

module.exports = router;
