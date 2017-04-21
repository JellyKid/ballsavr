const Score = require('../../db/models/Score');

function getScoresFromRound(req, res, next) {
  if(!req.query.id){
    return next();
  }
  let player = req.query.user || req.user;
  let paths = [{path: 'player', select: 'firstName lastName'}];
  if(!req.query.quick){
    paths.push(
      {path: 'round', select: 'name'},
      {path: 'table', select: 'name'}
    );
  }
  return Score
  .find({round: req.query.id, player: player})
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
