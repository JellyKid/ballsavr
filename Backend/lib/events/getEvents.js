const Event = require('../../db/models/event');

function getEvents(req, res, next) {
  res.locals.events = [];
  return Event.find(
    {enabled: true},
    (err, events) => {
      if(err){return next(err);}
      res.locals.events = events;
      return next();
    }
  );  
}

module.exports = getEvents;
