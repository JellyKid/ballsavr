const passport = require('passport');
const strategy = require('passport-facebook');

const join = require('path').join;
const env = join(__dirname, '../../../.env');
const fb = require('habitat').load(env).get('FACEBOOK');
const site = require('habitat').load(env).get('FRONTEND');

const User = require('../../db/models/User');

passport.use(new strategy(
  {
    clientID: fb.client_id,
    clientSecret: fb.client_secret,
    callbackURL: `${site.protocol}://${site.host}/api/login/facebook/return`,
    profileFields: ['profileUrl', 'displayName', 'name', 'picture'],
    enableProof: true
  },
  (accessToken, refreshToken, profile, done) => {
    console.log(accessToken);
    console.log(refreshToken);
    console.log(profile);
    return User.findOneAndUpdate(
      {
        'facebook.id' : profile.id
      },
      {
        'facebook.accessToken' : accessToken
      }
    )
    .then(
      (found) => {
        if(found){return done(null, found._id);}
        let user = new User({
          firstName: profile.name.givenName,
          lastName: profile.name.familyName,
          email: profile.email,
          facebook: {
            id: profile.id,
            accessToken: accessToken,
            profileUrl: profile.profileUrl,
            photos: profile.photos
          },
          meta: {
            activated: true,
            authType: 'facebook'
          }
        });
        user.save(
          (err, doc) => {
            if(err){throw err;}
            return done(null, doc._id);
          }
        );
      }
    )
    .catch(
      (err) => done(err)
    );
  }
));

passport.serializeUser(function(user, cb) {
  cb(null, user);
});

passport.deserializeUser(function(obj, cb) {
  cb(null, obj);
});


module.exports = passport;
