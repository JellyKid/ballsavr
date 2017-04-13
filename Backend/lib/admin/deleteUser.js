const path = require('path');
const User = require(path.normalize('../../db/models/User'));

function deleteUser(req, res, next) {
  return User.findOneAndRemove(
    {_id: req.params.id},
    (err, user) => {
      if(err){return next(err);}
      if(user){
        res.locals.user = user;
        return next();
      }
      return res.status(404).send(
        {
          status: 404,
          error: `User id ${req.params.id}`
        }
      );
    }
  );
}

module.exports = deleteUser;
