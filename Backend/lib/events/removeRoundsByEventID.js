const Round = require('../../db/models/Round');

function removeRoundsByEventID(req, res, next) {
  if(req.params.event){
    return Round.remove(
      {event: req.params.event},
      (err) => {
        if(err){return next(err);}
        return next();
      }
    );
  }
  return next(new Error(`Missing event ID`));
}

module.exports = removeRoundsByEventID;
