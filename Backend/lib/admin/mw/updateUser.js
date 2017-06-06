const User = require('../../../db/models/User');

function updateUser(req, res, next) {
  if(!req.body){
    return next('No body to parse with request');
  }
  var updates = {
    $set: {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      initials: req.body.initials,
      admin : req.body.admin,
      enabled: req.body.enabled,
      scoreKeeper: req.body.scoreKeeper
    }
  };
  return User.findByIdAndUpdate(
    req.body.user._id,
    updates,
    {runValidators: true},
    (err, raw) => {
      if(err) {
        console.error(err, raw);
        return next(err);
      }
      else {return next();}
    }
  );
}

module.exports = updateUser;
