function checkAuth(req, res, next) {
  if(req.user){
    return next();
  }
  return res.status(401).send({
    status: 401,
    message: "unauthorized"
  });
}

module.exports = checkAuth;
