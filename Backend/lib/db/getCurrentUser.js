const User = require('../../db/models/user');

function getCurrentUser(req, res, next) {
  if(req.user) {
    return User.findById(req.user, (err, user) => {
      if (err) {
        console.log(err);
        return res.status(500).send({error: err});
      }
      if (user) {
        res.locals.currentUser = user;
        return next();
      }
      return res.status(404).send({
        alert: `User ID ${req.user} not found`,
        error: `User ID ${req.user} not found`
      });
    });
  }
  return res.redirect('/');
}

module.exports = getCurrentUser;
