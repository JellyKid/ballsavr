const Round = require('../../db/models/round');

function upcomingRounds(req, res, next) {
  if(res.locals.events && req.user){
    return Round.find({event: {$in : res.locals.events}})
    .elemMatch('players',{user: req.user})
    .populate('event')
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

module.exports = upcomingRounds;
