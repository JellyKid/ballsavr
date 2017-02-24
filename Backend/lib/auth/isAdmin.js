function checkAuth(req, res, next) {
  if(res.locals.user && res.locals.user.meta.admin === true){
    return next();
  }
  return res.status(401).send({alert: "Unauthorized"});
}

module.exports = checkAuth;
