const path = require('path');
const router = require('express').Router();
const addUserDB = require(path.normalize('../db/addUser'));
const updateUser = require(path.normalize('../db/updateUser'));
const sendVerification = require('./sendVerification');
const parseForm = require('multer')().none(); //multipart body-parser

router.use(
  parseForm,
  addUserDB,
  sendVerification,
  updateUser
);


module.exports = router;
