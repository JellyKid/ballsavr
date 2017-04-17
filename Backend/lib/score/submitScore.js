const Score = require('../../db/models/Score');

module.exports = function (req, res, next) {

  if(!req.body.score || !req.body.round || !req.body.table){
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
      score: req.body.score,
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
      console.log(doc);
      return next();
    }
  );

};
