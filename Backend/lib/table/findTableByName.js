const Table = require('../../db/models/table');

function findTableByName(req, res, next) {
  if(req.params.query){
    return Table.findByName(
      req.params.query,
      (err, tables) => {
        if(err) {
          return res.status(500).send({
            status: 500,
            alert: err
          });
        }
        res.locals.searchResults = tables || [];
        return next();
      }
    );
  }
  res.locals.searchResults = [];
  return next();
}

module.exports = findTableByName;
