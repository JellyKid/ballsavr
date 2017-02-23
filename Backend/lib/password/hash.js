const crypto = require('./crypto');

function hashPassword(req,res,next) {
  return crypto.hash(req.body.password).then((hash) => {
    res.locals.hash = hash;
    return next();
  },(err) => res.status(500).send(`500: Failed during password hash. ${err}`));
}

module.exports = hashPassword;
