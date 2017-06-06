const Round = require('../../db/models/Round');

module.exports = (req, res, next) => {
  return Round.find({start: { $gt: new Date()}})
  .populate([
    {path: 'event', select: 'title description'},
    {path: 'tables', select: 'name'},
    {path: 'players.user', select: 'firstName lastName initials'}
  ])
  .lean()
  .exec(
    (err, rounds) => {
      if(err){return next(err);}
      res.locals.rounds = rounds || [];
      return next();
    }
  );
};
