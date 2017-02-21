const uid = require('rand-token').uid;

module.exports = (req, res, next) => {
  //NEED TO IMPLIMENT SEND MAIL
  const token = uid(24);
  res.locals.updates = {
    "meta.verificationToken" : token,
    "meta.invitationSent": true
  };
  return next();
};
