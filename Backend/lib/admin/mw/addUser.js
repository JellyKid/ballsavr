const User = require('../../../db/models/User');

module.exports = (req, res, next) => {
  return User.findOne({email: req.body.email}, (err, found) => {
    if(found){
      return next(`User with email address ${req.body.email} already exists`);
    }

    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      admin: req.body.admin
    });

    return user.save((err, user) => {
      res.locals.user = user;
      if(err){return next('Internal Error: Saving to DB');}
      return next();
    });
  });
};
