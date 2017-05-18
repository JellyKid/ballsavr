const Round = require('../../db/models/Round');
const Total = require('../../db/models/Total');
const Score = require('../../db/models/Score');

module.exports = (req, res, next) => {
  if(!res.locals.rounds || !res.locals.event){return next();}

  const promises = [];

  promises.push(
    Round
    .remove({
      event: res.locals.event,
      _id: {$nin: res.locals.rounds}
    })
  );

  promises.push(
    Total
    .remove({
      round: {$nin: res.locals.rounds}
    })
  );

  promises.push(
    Score
    .remove({
      round: {$nin: res.locals.rounds}
    })
  );

  return Promise
  .all(promises)
  .then((p) => next())
  .catch(
    (err) => next(err)
  );
};
