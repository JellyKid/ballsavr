const Event = require('../../db/models/Event');

function getEvents(req, res, next) {
  res.locals.events = [];
  return Event
  .find({enabled: true})
  .populate({
    path: 'rounds',
    model: 'round',
    populate: [
      {
        path: 'players.user',
        model: 'user',
        select: 'firstName lastName'
      },
      {
        path: 'tables',
        model: 'table',
        select: 'name'
      }
    ]
  })
  .lean()
  .exec(
    (err, events) => {
      if(err){return next(err);}
      res.locals.events = events;
      return next();
    }
  );
}
module.exports = getEvents;
