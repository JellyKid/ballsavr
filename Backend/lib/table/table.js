const router = require('express').Router();
const checkAuth = require('../auth/checkAuth');
// const getCurrentUser = require('../db/getCurrentUser');
const Table = require('../../db/models/table');

function getCurrentTables(req,res,next) {
  return Table.where('enabled',true).exec(
    (err,tables) => {
      if(err){
        res.status(500).send(err);
      }
      if(tables){
        return res.status(200).send(tables);
      }
      return res.status(200).send([]);
    }
  );
}

router.get(
  '/currentTables',
  getCurrentTables
);



module.exports = router;
