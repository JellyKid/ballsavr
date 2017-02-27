function logout(req, res, next) {
  if(req.user){
    req.logout();
  }
  return res.redirect('/');
}

module.exports = logout;
