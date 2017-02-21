const passport = require('passport');
const strategy = require('passport-local').Strategy;
const router = require('express').Router();

const User = require('../../db/models/user');

passport.use(new strategy(
  function(userid, password, done) {
    User.findOne({email: userid}, (err, user) => {
      if(err) {return done(err);}
      if(user){
        console.log(user.id);
        return done(null, user.id);
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
  //console.log(serialized);
  done(null, serialized);
});

router.use(passport.initialize());
router.use(passport.session());

router.post(
  '/login',
  (req,res) => {console.log(req.body);},
  passport.authenticate('local', {failureRedirect: 'http://localhost'}),
  (req, res) => { res.redirect('http://localhost');}
);


module.exports = router;
