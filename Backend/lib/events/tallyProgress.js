const Score = require('../../db/models/Score');
const Round = require('../../db/models/Round');

module.exports = (req, res, next) => {
  if(!res.locals.score || !res.locals.score.confirmed){return next();}

  let round = res.locals.score.round;

  Score
  .count({round: round})
  .then(
    (count) => Round.findById(round)
    .then(
      (doc) => {
        doc.set('currentProgress', count);
        return doc.save();
      }
    )
  )
  .then(() => next())
  .catch((err) => next(err));
};
