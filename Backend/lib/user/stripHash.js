function stripHash(req, res, next) {
  if(!res.locals.user && !res.locals.currentUser){
    return res.status(500).send("No user in strip hash function");
  }

  if(res.locals.user){res.locals.user.hash = undefined;}
  if(res.locals.currentUser){res.locals.currentUser.hash = undefined;}

  if(res.locals.users){
    for (var i = 0; i < res.locals.users.length; i++) {
      res.locals.users[i].hash = undefined;
    }
  }

  return next();
}

module.exports = stripHash;
