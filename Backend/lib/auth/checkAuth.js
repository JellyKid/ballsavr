function checkAuth(req, res, next) {
  if(req.user){
    console.log(req.user);
    next();
  } else {
    console.log("user not authenticated");
    next();
  }
}

module.exports = checkAuth;
