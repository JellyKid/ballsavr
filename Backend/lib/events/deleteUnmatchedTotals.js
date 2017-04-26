const Total = require('../../db/models/Total');
const Score = require('../../db/models/Score');

function deleteUnmatchedTotals(req, res, next) {
  if(!res.locals.totals || !res.locals.rounds){
    return next();
  }

  let promises = [];
  let rounds = res.locals.rounds;
  for (var i = 0; i < rounds.length; i++) {
    let users = rounds[i].players.map((player) => player.user);
    promises.push(
      Total.remove(
        {
          round: rounds[i],
          player: {$nin: users}
        }
      )
    );
    promises.push(
      Score.remove(
        {
          round: rounds[i],
          player: {$nin: users}
        }
      )
    );
    promises.push(
      Score.remove(
        {
          round: rounds[i],
          table: {$nin: rounds[i].tables}
        }
      )
    );
  }

  return Promise
  .all(promises)
  .then(() => next())
  .catch((err) => next(err));
}

module.exports = deleteUnmatchedTotals;
