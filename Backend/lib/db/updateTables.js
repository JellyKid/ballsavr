const Table = require('../../db/models/table');

function updateTablesDB(req, res, next) {
  res.locals.tables.forEach((table) => {
    console.log(`Adding table ${table.name}`);
    Table.findOneAndUpdate(
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
  });
  return next();
}

module.exports = updateTablesDB;
