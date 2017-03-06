const User = require('../../db/models/User');

function parseUpdates(req, res, next) {
  if(!req.body){
    return next(new Error("No body in post!"));
  }

  res.locals.user = req.body;

  if(res.locals.currentUser.admin){
    res.locals.updates = {
      $set: {
        firstName: req.body.firstName, //Here are the fields that the admin can update themselves
        lastName: req.body.lastName,
        email: req.body.emailName,
        initials: req.body.initials,
        "meta.admin" : req.body.admin
      }
    };
  } else if (req.user === req.body._id){
    res.locals.updates = {
      $set: {
        firstName: req.body.firstName, //Here are the fields that the user can update themselves
        lastName: req.body.lastName,
        email: req.body.emailName,
        initials: req.body.initials
      }
    };
  }

  return next();
}

module.exports = parseUpdates;
