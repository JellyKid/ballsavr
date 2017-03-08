const User = require('../../db/models/user');

function updateUser(req, res, next) {
  if(!res.locals.user._id || !res.locals.updates){
    console.error("missing updates or user._id");
    console.error("user._id:",res.locals.user._id);
    console.error("updates:",res.locals.updates);
    return res.status(500).send({
      alert: "Internal Error: Updating User",
      error: "missing local.updates or user._id"
    });
  }
  return User.findByIdAndUpdate(
    res.locals.user._id,
    res.locals.updates,
    {runValidators: true},
    (err, raw) => {
      if(err) {
        console.error(err, raw);
        return res.status(500).send({
          error: err,
          alert: "Internal Error: Updating User"
        });
      }
      else {return next();}
    }
  );
}

module.exports = updateUser;
