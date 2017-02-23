function checkAuth(req, res, next) {
  if(req.user){
    return next();
  }
  return res.status(401).send({alert: "Unauthorized"});
}

module.exports = checkAuth;
