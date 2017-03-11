const path = require('path');
const router = require('express').Router();
const getUserByToken = require(path.normalize('../db/getUserByToken'));
const parseForm = require('multer')().none(); //multipart body-parser
const hashPassword = require(path.normalize('../auth/hash'));
const updateUser = require(path.normalize('../db/updateUser'));

function createUpdates(req, res, next) {
  res.locals.updates = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      hash: res.locals.hash,
      initials: req.body.initials,
      "meta.activated": true
    },
    $unset: {
      "meta.verificationToken": ""
    }
  };
  return next();
}

router.use(
  parseForm,
  getUserByToken,
  hashPassword,
  createUpdates,
  updateUser
);

module.exports = router;
