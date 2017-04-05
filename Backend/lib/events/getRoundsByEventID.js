const Round = require('../../db/models/round');

function getRoundsByEventID(req, res, next) {
  if(req.params.event){
    return Round
    .find({event: req.params.event})
    .populate({path: 'players.user', select: 'firstName lastName'})
    .populate({path: 'tables', select: 'name'})
    .lean()
    .exec(
      (err, rounds) => {
        if(err){return next(err);}
        res.locals.rounds = rounds || [];
        return next();
      }
    );
  }
  return res.redirect('/');
}

module.exports = getRoundsByEventID;
