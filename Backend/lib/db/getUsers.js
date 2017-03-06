const User = require('../../db/models/User');

function getUsers(req,res,next) {
  return User.find(
    {},
    (err,users) => {
      if(err){return next(err);}
      res.locals.users = users;
      return next();
    }
  );
}

module.exports = getUsers;
