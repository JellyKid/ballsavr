const Score = require('../../db/models/Score');

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
      confirmed: req.user.admin ? true : false
    },
    {
      upsert: true,
      runValidators: true,
      new: true,
      setDefaultsOnInsert: true
    },
    (err, doc) => {
      if(err){return next(err);}
      if(doc)(res.locals.score = doc);
      return next();
    }
  );

};
