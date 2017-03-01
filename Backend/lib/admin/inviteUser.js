const router = require('express').Router();
const addUserDB = require('../db/addUser');
const updateUser = require('../db/updateUser');
const sendVerification = require('./sendVerification');
const parseForm = require('multer')().none(); //multipart body-parser

router.use(
  parseForm,
  addUserDB,
  sendVerification,
  updateUser,
  (req, res, next) => res.redirect('/')
);


module.exports = router;
