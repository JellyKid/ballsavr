const Score = require('../../db/models/Score');
const tallyTotals = require('./tallyTotals');

module.exports = function (req, res, next) {

  if(!req.body.value || !req.body.round || !req.body.table){
    return next(new Error("Missing score, round or table"));
  }

  return Score.findOneAndUpdate(
    {
      round: req.body.round,
      player: req.user,
      table: req.body.table
    },
    {
      round: req.body.round,
      player: req.user,
      table: req.body.table,
      value: req.body.value,
      group: req.body.group || null,
      confirmed: false
    },
    {
      upsert: true,
      runValidators: true,
      new: true
    },
    (err, doc) => {
      if(err){return next(err);}
      if(doc)(tallyTotals(doc));
      return next();
    }
  );

};
