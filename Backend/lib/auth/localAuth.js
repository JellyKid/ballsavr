const passport = require('passport');
const strategy = require('passport-local').Strategy;
const router = require('express').Router();
const parseForm = require('multer')().none();

const User = require('../../db/models/user');
const crypto = require('../password/crypto');

passport.use(new strategy(
  function(userid, password, done) {
    User.findOne({email: userid}, (err, user) => {
      if(err) {
        console.log(err);
        return done(err);
      }
      if(user){
        return crypto.verify(
          password,
          user.hash,
          (err, verified) => {
            if(err) {return done(err);}
            if(verified){
              return done(null, user.id);
            }
            return done(null, false);
          }
        );
      }
      console.log(`user ${userid} not found`);
      return done(null, false);
    });
  }
));

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((serialized, done) => {
  done(null, serialized);
});

router.use(passport.initialize());
router.use(passport.session());

router.post(
  '/login',
  parseForm,
  passport.authenticate('local', {failureRedirect: '/'}),
  (req, res) => { res.redirect('/');}
);


module.exports = router;
