const User = require('../models/user');

function getUserByToken(req, res, next) {
    return User.findByToken(req.query.token,
      (err, user) => {
        if(err){
          console.log(err);
          return res.sendStatus(500);
        }
        if(user){          
          return res.status(200).send(user);
        }
      return res.sendStatus(403);
    });
}

module.exports = getUserByToken;
