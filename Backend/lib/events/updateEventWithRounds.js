const path = require('path');
const Event = require(path.normalize('../../db/models/Event'));

function updateEventWithRounds(req, res, next) {
  if(res.locals.event && res.locals.rounds){  
    return res.locals.event.update(
      {rounds: res.locals.rounds},
      (err, doc) => {
        if(err){return next(err);}
        res.locals.event = doc;
        return next();
      }
    );
  }
  console.log('updateEventWithRounds: no rounds or events found');
  return next();
}

module.exports = updateEventWithRounds;
