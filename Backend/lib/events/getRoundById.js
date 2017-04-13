const Round = require('../../db/models/Round');

function getRoundByID(req, res, next) {
  if(!req.params.id){
    return next();
  }

  return Round
  .findById(req.params.id)
  .populate({path: 'event', select: 'title description'})
  .lean()
  .exec(
    (err, round) => {
      if(err){return next(err);}
      res.locals.round = round;
      return next();
    }
  );
}

module.exports = getRoundByID;
