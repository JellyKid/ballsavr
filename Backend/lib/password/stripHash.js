function stripHash(req, res, next) {
  if(!res.locals.user && !res.locals.currentUser){
    return res.status(500).send("No user in strip hash function");
  }

  if(res.locals.user){res.locals.user.hash = undefined;}
  if(res.locals.currentUser){res.locals.currentUser.hash = undefined;}
  // console.log("BEFORE",res.locals);
  // console.log("DO IT", delete res.locals.user.firstName);
  // console.log("AFTER",res.locals);
  return next();
}

module.exports = stripHash;
