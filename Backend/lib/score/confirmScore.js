const Score = require('../../db/models/Score');

module.exports = (req, res, next) => {
  console.log(req.params);
  if(!req.params.id || !req.user || (!req.user.scoreKeeper && !req.user.admin) ){
    return next(new Error("Missing param.id or user is not scorekeeper/admin"));
  }

  return Score
  .findOne({_id: req.params.id})
  .then(
    (score) => {
      if(!score){
        throw "No score found with that ID";
      }
      //prevent scorekeeper that is not an admin from confirming own scores
      if(req.user.scoreKeeper && !req.user.admin && req.user._id === score.player){
        throw "Scorekeeper cannot confirm own score, unless they are an admin";
      }
      score.set('confirmed', true);
      return score.save({new: true});
    }
  )
  .then((score) => {    
    res.locals.score = score;
    return next();
  })
  .catch(
    (err) => next(err)
  );
};
