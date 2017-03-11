const path = require('path');
const User = require(path.normalize('../../db/models/user'));

function parseUpdates(req, res, next) {
  if(!req.body){
    console.error("No body in post!");
    return next(new Error("No body in post!"));
  }
  console.log(req.body);
  res.locals.user = req.body;


  if(res.locals.currentUser.admin){
    res.locals.updates = {
      $set: {
        firstName: req.body.firstName, //Here are the fields that the admin can update themselves
        lastName: req.body.lastName,
        email: req.body.email,
        initials: req.body.initials,
        admin : req.body.admin
      }
    };
  } else if (req.user === req.body._id){
    res.locals.updates = {
      $set: {
        firstName: req.body.firstName, //Here are the fields that the user can update themselves
        lastName: req.body.lastName,
        email: req.body.email,
        initials: req.body.initials
      }
    };
  }

  return next();
}

module.exports = parseUpdates;
