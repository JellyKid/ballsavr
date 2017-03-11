const path = require('path');
const User = require(path.normalize('../../db/models/user'));

function getUsers(req,res,next) {
  return User.
    find(res.locals.filter || {}).
    limit(100).
    sort("firstName").
    exec(
      (err, users) => {
        if(err){return next(err);}
        res.locals.users = users;
        return next();
      }
    );
}

module.exports = getUsers;
