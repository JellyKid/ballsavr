const path = require('path');
const Table = require(path.normalize('../../db/models/Table'));

function getCurrentTables(req,res,next) {
  return Table.where('enabled',true).exec(
    (err,tables) => {
      if(err){
        res.status(500).send({
          status: 500,
          alert: "Internal error while trying to get current tables"
        });
      }
      res.locals.currentTables = tables || [];
      return next();
    }
  );
}

module.exports = getCurrentTables;
