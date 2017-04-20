const Total = require('../../db/models/Total');

function saveTotals(req, res, next) {
  if(!res.locals.rounds){
    return next();
  }

  let promises = [];
  let rounds = res.locals.rounds;
  for (var i = 0; i < rounds.length; i++) {
    for (var j = 0; j < rounds[i].players.length; j++) {
      let total = {
        player: rounds[i].players[j].user,
        group: rounds[i].players[j].group,
        round: rounds[i]._id
      };
      promises.push(
        Total.findOneAndUpdate(
          total,
          total,
          {
            new: true,
            upsert: true,
            runValidators: true,
            setDefaultsOnInsert: true
          }
        ).exec()
      );
    }
  }

  return Promise.all(promises)
  .then(
    (totals) => {
      res.locals.totals = totals || [];
      return next();
    }
  )
  .catch(
    (err) => next(err)
  );
}

module.exports = saveTotals;
