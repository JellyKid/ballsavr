const crypto = require('./crypto');

function hashPassword(req,res,next) {
  return crypto.hash(req.body.password).then((hash) => {
    res.locals.hash = hash;
    return next();
  },(err) => res.status(500).send({
    alert: `500: Failed during password hash`,
    error: err
  }));
}

module.exports = hashPassword;
