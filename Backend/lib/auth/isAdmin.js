function checkAuth(req, res, next) {
  if(res.locals.currentUser && res.locals.currentUser.admin === true){
    return next();
  }
  return res.status(401).send({alert: "Unauthorized"});
}

module.exports = checkAuth;
