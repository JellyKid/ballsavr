const User = require('../../db/models/user');

function updateUser(req, res, next) {
  if(!res.locals.user._id || !res.locals.updates){
    console.error("missing updates or user._id");
    return res.status(500).send("missing local.updates or user._id");
  }
  return User.findByIdAndUpdate(
    res.locals.user._id,
    res.locals.updates,
    {runValidators: true},
    (err, raw) => {
      if(err) {
        console.error(err);
        return res.status(500).send(err);
      }
      else {return next();}
    }
  );
}

module.exports = updateUser;
