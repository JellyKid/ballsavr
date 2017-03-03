const Table = require('../../db/models/table');

function findByIdAndUpdate(req, res, next) {
  if(res.locals.ids && res.locals.updates){
    return Promise.all(
      res.locals.ids.map((id) => {
        return Table.findByIdAndUpdate(
          id,
          res.locals.updates,
          {runValidators: true},
          (err,found) => {
            if(found){console.log(`updating ${found.name}`,res.locals.updates);}
            if(err){
              console.log(`ERROR: ${err}`);
              return res.status(500).send({
                error: err
              });
            }
          }
        );
      })
    ).then(
      () => next()
    ).catch(
      (err) => console.error(err)
    );
  }

  return next();
}

module.exports = findByIdAndUpdate;
