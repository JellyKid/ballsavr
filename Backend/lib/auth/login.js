function logInUser(req, res, next) {
  return req.login(
    res.locals.user._id,
    (err) => {
      if(err) {return res.status(500).send({error: "Could not log in new user"});}
      return next();
    }
  );
}

module.exports = logInUser;
