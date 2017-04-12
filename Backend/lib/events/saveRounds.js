const path = require('path');
const Round = require(path.normalize('../../db/models/round'));

function updateRounds(req, res, next) {

  let promises = req.body.rounds.map(
    (round) => new Promise(
      (resolve, reject) => {
        let r = new Round(
          Object.assign({}, round, {event: res.locals.event})
        );
        r.isNew = round._id ? false : true;
        return r.save(
          (err, doc) => {
            if(err) {return reject(err);}
            if(!doc) {return reject(Error(`Document missing on saving round`));}
            return resolve(doc);
          }
        );
      }
    )
  );

  return Promise.all(promises)
    .then((rounds) => {
      res.locals.rounds = rounds;
      return next();
    })
    .catch(
      (err) => next(err)
    );

}

module.exports = updateRounds;
