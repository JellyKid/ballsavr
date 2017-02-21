const crypto = require('./crypto');

function hashPassword(req,res,next) {
  crypto.hash(req.body.password).then((hash) => {
    res.locals.hash = hash;
    return next();
  },(err) => res.sendStatus(503));
}

module.exports = {
  hashPassword: hashPassword
};
