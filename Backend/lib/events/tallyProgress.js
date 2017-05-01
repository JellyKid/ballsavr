const Score = require('../../db/models/Score');
const Round = require('../../db/models/Round');

module.exports = (req, res, next) => {
  if(!res.locals.score || !res.locals.score.confirmed){return next();}

  let round = res.locals.score.round;

  Score
  .count({round: round, confirmed: true})
  .then(
    (count) => Round.findById(round)
    .then(
      (doc) => {
        let progress = Math.floor((count/(doc.tables.length * doc.players.length))*100);
        doc.set('progress', progress);        
        return doc.save();
      }
    )
  )
  .catch((err) => next(err));

  return next();
};
