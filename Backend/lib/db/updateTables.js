const path = require('path');
const Table = require(path.normalize('../../db/models/table'));

function updateTablesDB(req, res, next) {
  if(!res.locals.tables){
    res.status(500).send({
      error: "No tables to update?"
    });
  }

  return Promise.all(
    res.locals.tables.map((table) => {
      return Table.findOneAndUpdate(
        {name: table.name}, //table to find
        table, //updated info
        {
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true
        },
        (err) => {
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
    (err) => res.status(500).send({error:err})
  );

}

module.exports = updateTablesDB;
