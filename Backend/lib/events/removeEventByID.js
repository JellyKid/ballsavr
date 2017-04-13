const Event = require('../../db/models/Event');

function removeEventByID(req, res, next) {
  if(req.params.event){
    return Event.findByIdAndRemove(
      req.params.event,
      (err, doc) => {
        if(err){return next(err);}
        if(doc){return next();}
        return next(new Error(`No event found with id of ${req.params.event}`));
      }
    );
  }
  return next(new Error(`Missing event ID`));
}

module.exports = removeEventByID;
