const router = require('express').Router();
const getUserByToken = require('../db/getUserByToken');
const parseForm = require('multer')().none(); //multipart body-parser
const stripHash = require('../password/stripHash');
const hashPassword = require('../password/hash');
const updateUser = require('../db/updateUser');

function createUpdates(req, res, next) {
  res.locals.updates = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hash: res.locals.hash,
      "meta.active": true
    },
    $unset: {
      "meta.verificationToken": ""
    }
  };
  return next();
}

router.get(
  '/register',
  getUserByToken,
  stripHash, //if sending back across the web make sure to always strip hash
  (req, res) => res.status(200).send(res.locals.user)
);

router.post(
  '/register',
  parseForm,
  getUserByToken,
  hashPassword,
  createUpdates,
  updateUser,
  (req,res) => res.redirect('/')
);

module.exports = router;
