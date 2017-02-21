const User = require('../models/user');

function updateUser(req, res, next) {
  if(!res.locals.user._id || !res.locals.updates){    
    console.error("missing updates or user._id");
    return res.sendStatus(500);
  }
  return User.findByIdAndUpdate(
    res.locals.user._id,
    { $set: res.locals.updates},
    {runValidators: true},
    (err, raw) => {
      if(err) {
        console.error(err);
        return res.sendStatus(500);
      }
      else {return next();}
    }
  );
}

module.exports = updateUser;
