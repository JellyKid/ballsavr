const User = require('../../db/models/user');

function addUser(req, res, next) {
  //See if there is already a user with that email. Send 409 if found.
  return User.findOne({email: req.body.email}, (err, found) => {
    if(found){
      return res.status(409).send(
        {alert: `User with email address ${req.body.email} already exists`}
      );
    }
    //creat new user object
    let user = new User({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      admin: req.body.admin      
    });

    //save user object to database
    return user.save((err, user) => {
      res.locals.user = user;
      if(err){return res.status(500).send({
        alert: 'Internal Error: Saving to DB',
        error: err
      });}
      return next();
    });
  });
}

module.exports = addUser;
