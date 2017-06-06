const User = require('../../../db/models/User');

module.exports = (req, res, next) => {
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
};
