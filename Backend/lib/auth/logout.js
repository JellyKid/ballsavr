function logout(req, res, next) {  
  if(req.user){
    req.logout();
  }
  return next();
}

module.exports = logout;
