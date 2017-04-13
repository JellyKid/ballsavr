const path = require('path');
const User = require(path.normalize('../../db/models/User'));

function noUsersCheck(req, res, next) {
  return User.count(
    {},
    (err, count) => {
      if(count === 0){
        res.locals.nousers = true;
      }
      return next();
    }
  );
}

module.exports = noUsersCheck;
