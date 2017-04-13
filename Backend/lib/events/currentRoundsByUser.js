const Round = require('../../db/models/Round');

function currentRoundsByUser(req, res, next) {
  if(req.user){
    return Round.find({start: { $gt: new Date()}})
    .elemMatch('players',{user: req.user})
    .populate('event')
    .lean()
    .exec(
      (err, rounds) => {
        if(err){return next(err);}
        res.locals.rounds = rounds || [];
        return next();
      }
    );
  }
  return next();
}

module.exports = currentRoundsByUser;
