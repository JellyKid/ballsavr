function checkAuth(req, res, next) {
  if(req.user){
    return next();
  }
  return res.sendStatus(401);
}

module.exports = checkAuth;
