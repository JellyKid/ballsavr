const Round = require('../../db/models/Round');
const Event = require('../../db/models/Event');

function getRoundsByEventID(req, res, next) {
  if(req.params.event){
    return Event
    .findById(req.params.event)
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
      (err, event) => {
        if(err){return next(err);}
        res.locals.rounds = event.rounds || [];
        return next();
      }
    );
  }
  return res.redirect('/');
}

module.exports = getRoundsByEventID;
