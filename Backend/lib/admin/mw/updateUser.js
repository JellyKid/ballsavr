const User = require('../../../db/models/User');

function updateUser(req, res, next) {
  var updates, id;

  if(req.body){
    updates = {
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
    id = req.body._id;
  }

  if(res.locals.user && res.locals.user._id && res.locals.updates){
    updates = res.locals.updates;
    id = res.locals.user._id;
  }

  if(!id || !updates){
    return next('ID or Updates missing');
  }


  return User.findByIdAndUpdate(
    id,
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
