const Total = require('../../db/models/Total');
const Score = require('../../db/models/Score');

module.exports = (round) => {
  const io = require('../../express');
  return Total
  .find({round: round})
  .populate({path: 'player', select: 'firstName lastName initials'})
  .lean()
  .then(
    (totals) => {
      Score
      .find({round: round})
      .populate([
        {path: 'player', select: 'firstName lastName'},        
        {path: 'table', select: 'name'}
      ])
      .lean()
      .exec(
        (err, scores) => {
          if(err) throw err;
          io.of('/round').in(round).emit(
            'rankings',
            {
              totals: totals,
              scores: scores
            }
          );
        }
      );
    }
  );
};
