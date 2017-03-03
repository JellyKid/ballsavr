const Table = require('../../db/models/table');

function getCurrentTables(req,res,next) {
  return Table.where('enabled',true).exec(
    (err,tables) => {
      if(err){
        res.status(500).send({
          status: 500,
          alert: "Internal error while trying to get current tables"
        });
      }
      res.locals.currentTables = tables ? tables : [];
      return next();
    }
  );
}

module.exports = getCurrentTables;