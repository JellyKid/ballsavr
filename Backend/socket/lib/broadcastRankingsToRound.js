const getTotalsAndScoresForRound = require('../../lib/db/getTotalsAndScoresForRound');
const debug = require('debug')('Ballsavr-socket');

module.exports = (round) => {
  const io = require('../../express');
  return getTotalsAndScoresForRound(round)
  .then(
    (stats) => io.of('/round').in(round).emit('rankings', stats)
  )
  .catch((err) => debug(err));
};
