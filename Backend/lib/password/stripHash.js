function stripHash(req, res, next) {
  if(!res.locals.user){
    return res.status(500).send("No user in strip hash function");
  }
  res.locals.user.hash = "";
  return next();
}

module.exports = stripHash;
