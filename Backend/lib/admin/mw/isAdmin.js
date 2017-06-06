module.exports = (req, res, next) => {
  if(req.user.admin === true){
    return next();
  }
  return res.status(401).send({alert: "Unauthorized"});
};
