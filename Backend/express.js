//express and middleware
const express = require('express');
const passport = require('passport');
const cookieParser = require('cookie-parser');

const expressSession = require('express-session');

//DB connection
const store = require('./db');

//Get stored environmental variables
const join = require('path').join;
const envFile = join(__dirname, '../.env');
const env = require('./helper/getEnv')('API',envFile);

const PORT = process.argv[2] || env.get('PORT') || 80;
const HOST = process.argv[3] || env.get('HOST') || '127.0.0.1';
const secret = env.get('secret') || 'change the secret here or in .env file';

const app = express();

//common middleware
app.use(cookieParser());
// app.use(bodyParser.urlencoded({extended: true}));
app.use(expressSession({
  secret: secret,
  resave: false, //may have to set this to true for mongo sessions
  saveUninitialized: false,
  cookie: {
    maxAge: 604800000 //One week in milliseconds
  },
  store: store //mongodb store
}));
app.use(passport.initialize());
app.use(passport.session());

//API middleware
app.use(require('./lib/Auth'));
app.use(require('./lib/Admin'));
app.use(require('./lib/Event'));
app.use(require('./lib/User'));
app.use(require('./lib/Table'));
app.use(require('./lib/Public'));
app.use(require('./lib/Score'));

app.listen(
  PORT,
  HOST,
  127,
  () => console.log(`Server listening on ${HOST}:${PORT}`)
);

module.exports = app;
