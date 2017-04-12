const path = require('path');
const Event = require(path.normalize('../../db/models/event'));

function updateEvent(req, res, next) {
  const event = new Event(req.body.event);
  event.isNew = req.body.event._id ? false : true;
  return event.save(
    (err, doc) => {
      if(err) {return next(err);}
      if(!doc) {return next(Error(`Document missing on saving event`));}
      res.locals.event = doc;
      return next();
    }
  );
}

module.exports = updateEvent;
