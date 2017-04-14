const Score = require('../../db/models/Score');

function getScoresFromRound(req, res, next) {
  if(!req.query.id){
    return next();
  }
  let paths = [{path: 'player', select: 'firstName lastName'}];
  if(!req.query.quick){
    paths.push(
      {path: 'round', select: 'name'},
      {path: 'table', select: 'name'}
    );
  }
  return Score
  .find({round: req.query.id})
  .populate(paths)
  .lean()
  .exec(
    (err, doc) => {
      if(err){return next(err);}
      res.locals.scores = doc || [];
      return next();
    }
  );
}

module.exports = getScoresFromRound;
