const path = require('path');
const User = require(path.normalize('../../db/models/User'));

function parseUpdates(req, res, next) {
  if(!req.body){
    console.error("No body in post!");
    return next(new Error("No body in post!"));
  }
  res.locals.user = req.body;
  // console.log("user id", req.user._id);
  // console.log("body id", req.body._id);
  // console.log("match", req.user._id == req.body._id);
  // console.log("user id type", typeof req.user._id);
  // console.log("body id type", typeof req.body._id);
  // console.log(req.user);

  if(req.user.admin){
    res.locals.updates = {
      $set: {
        firstName: req.body.firstName, //Here are the fields that the admin can update themselves
        lastName: req.body.lastName,
        email: req.body.email,
        initials: req.body.initials,
        admin : req.body.admin,
        enabled: req.body.enabled,
        scoreKeeper: req.body.scoreKeeper
      }
    };
  } else if (req.user._id == req.body._id){//FOR SOME REASON user._id is an object and body._id is a string, WTF..... type casting here.... WTF?!?!?!?

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
