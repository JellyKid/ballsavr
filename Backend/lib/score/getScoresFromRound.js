const Score = require('../../db/models/Score');

function getScoresFromRound(req, res, next) {
  if(!req.query.id){
    return next();
  }

  let query = req.query.user ?
  {round: req.query.id, player: req.query.user} :
  {round: req.query.id};  

  let paths = [];
  if(!req.query.quick){
    paths.push(
      {path: 'player', select: 'firstName lastName'},
      {path: 'round', select: 'name'},
      {path: 'table', select: 'name'}
    );
  }
  return Score
  .find(query)
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
