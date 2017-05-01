const Total = require('../../db/models/Total');
const Score = require('../../db/models/Score');

module.exports = (round) => {
  var totals;
  return Total
  .find({round: round})
  .populate({path: 'player', select: 'firstName lastName initials'})
  .lean()
  .then(
    (res) => {
      totals = res || [];
      return Score
      .find({round: round})
      .populate([
        {path: 'player', select: 'firstName lastName'},
        {path: 'table', select: 'name'}
      ])
      .lean();
    }
  )
  .then(
    (res) => ({totals: totals, scores: res || []})
  );
};
