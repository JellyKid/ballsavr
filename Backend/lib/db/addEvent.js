const path = require('path');
const Event = require(path.normalize('../../db/models/event'));

function addEvent(req, res, next) {
  let event = new Event({
    title: req.body.event.title,
    subtitle: req.body.event.subtitle,
    type: req.body.event.type,
    description: req.body.event.description,
    localimg: req.body.event.localimg,
    extlink: req.body.event.extlink,
    start: req.body.event.start,
    rounds: req.body.event.rounds
  });

  return event.save((err, event) => {
    res.locals.event = event;
    if(err){
      return res.status(500).send({error: err});
    }
    return next();
  });
}

module.exports = addEvent;
