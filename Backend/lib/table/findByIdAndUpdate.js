const path = require('path');
const Table = require(path.normalize('../../db/models/Table'));

function findByIdAndUpdate(req, res, next) {
  if(res.locals.ids && res.locals.updates){
    let promises = res.locals.ids.map((id) => {
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
    });
    return Promise.all(promises).then(
      () => next()
    ).catch(
      (err) => console.error(err)
    );
  }

  return res.status(500).send(
    {
      status: 500,
      error: "No id's found to update"
    }
  );
}

module.exports = findByIdAndUpdate;
