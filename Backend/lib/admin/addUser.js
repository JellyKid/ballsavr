const router = require('express').Router();
const checkAuth = require('../auth/checkAuth');
const addUserDB = require('../../db/middleware/addUser');
const updateUser = require('../../db/middleware/updateUser');
const sendVerification = require('./sendVerification');
const parseForm = require('multer')().none(); //multipart body-parser


//add user should create a new, non-enabled user and send a verification email

router.post(
  '/addUser',
  checkAuth, //make sure user is authenticated
  parseForm,
  addUserDB, //add a new user to database
  sendVerification, //create new verification token and send email
  updateUser, //update user with new verification token
  (req, res, next) => res.redirect('/')
);


module.exports = router;
