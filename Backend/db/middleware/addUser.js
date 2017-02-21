const User = require('../models/user');

function addUser(req, res, next) {
  let user = new User({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email,
    meta: {
      admin: req.body.admin
    }
  });
  return user.save((err, user) => {
    res.locals.user = user;
    if(err){return res.sendStatus(500);}
    return next();
  });
}

module.exports = addUser;
