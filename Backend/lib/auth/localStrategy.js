const path = require('path');
const passport = require('passport');
const strategy = require('passport-local').Strategy;

const User = require(path.normalize('../../db/models/user'));
const crypto = require(path.normalize('./crypto'));

passport.use(new strategy(
  function(userid, password, done) {
    User.findOne({email: userid}).
      select("+hash").
      exec(
        (err, user) => {
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
       }
      );
  }
));

passport.serializeUser((id, done) => {
  done(null, id);
});

passport.deserializeUser((serialized, done) => {
  done(null, serialized);
});


module.exports = passport;
