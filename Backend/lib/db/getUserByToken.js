const User = require('../../db/models/user');

function getUserByToken(req, res, next) {
  let token = req.query.token || req.body.token;
  return User.findByToken(token,
    (err, user) => {
      if(err){
        return res.status(500).send(err);
      }
      if(user){
        res.locals.user = user;
        return next();
      }
    return res.status(403).send("Error finding user by token");
  });
}

module.exports = getUserByToken;
