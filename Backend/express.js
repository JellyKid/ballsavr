//express and middleware
const express = require('express');
const passport = require('passport');
// const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const expressSession = require('express-session');

//DB connection
const db = require('./db');

//Get stored environmental variables
const env = require('./helper/getEnv')('API');

const PORT = process.argv[2] || env.get('PORT') || 80;
const HOST = process.argv[3] || env.get('HOST') || '127.0.0.1';
const secret = env.get('secret') || 'change the secret here or in .env file';

const app = express();

//common middleware
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: secret,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 604800000 //One week in milliseconds
  }
}));
app.use(passport.initialize());
app.use(passport.session());

//API middleware
app.use(require('./lib/auth/localAuth'));
app.use(require('./lib/admin/inviteUser'));
app.use(require('./lib/user/register'));
app.use(require('./lib/user/user'));
app.use(require('./lib/db/updateTablesFromIPDB'));
app.use(require('./lib/table/table'));

app.listen(PORT, HOST);

module.exports = app;
