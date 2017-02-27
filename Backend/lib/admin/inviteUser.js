const router = require('express').Router();
const checkAuth = require('../auth/checkAuth');
const isAdmin = require('../auth/isAdmin');
const getCurrentUser = require('../db/getCurrentUser');
const addUserDB = require('../db/addUser');
const updateUser = require('../db/updateUser');
const sendVerification = require('./sendVerification');
const parseForm = require('multer')().none(); //multipart body-parser


//add user should create a new, non-enabled user and send a verification email

router.post(
  '/addUser',
  getCurrentUser, //make sure user is authenticated and get user info
  isAdmin, //check if user is admin
  parseForm, //parse form?
  addUserDB, //add a new user to database
  sendVerification, //create new verification token and send email
  updateUser, //update user with new verification token
  (req, res, next) => res.redirect('/')
);


module.exports = router;
