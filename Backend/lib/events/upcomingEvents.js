const Event = require('../../db/models/Event');

function upcomingEvents(req, res, next) {
  return Event.find(
    {start: {$gt: new Date()}},
    (err, events) => {
      if(err){return next(err);}
      res.locals.events = events || [];
      return next();
    }
  );
}

module.exports = upcomingEvents;
