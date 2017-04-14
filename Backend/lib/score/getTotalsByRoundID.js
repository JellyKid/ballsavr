const Total = require('../../db/models/Total');

function getTotalsByRoundID(req, res, next) {
  if(!req.query.round){
    return next();
  }
  return Total
  .find({round: req.query.round})
  .populate({path: 'player', select: 'firstName lastName initials'})
  .lean()
  .exec(
    (err, totals) => {
      if(err){return next(err);}
      res.locals.totals = totals;
      return next();
    }
  );
}

module.exports = getTotalsByRoundID;
