const path = require('path');
const router = require('express').Router();

const updateTablesDB = require(path.normalize('../db/updateTables'));

const fetch = require('node-fetch');
const jsdom = require('jsdom');

const rowsEnum = {
  name: 0,
  manufacturer: 1,
  manufactureDate: 2,
  players: 3
};

function parseBody(html) {
  return new Promise((resolve, reject) => {
    return jsdom.env(
      html,
      (err, window) => {
        if(err){return reject(err);}
        let tables = [];

        let rows = window.document.getElementsByTagName('tr');

        for (var i = 1; i < rows.length; i++) {
          tables.push(
            {
              name: rows[i].children[rowsEnum.name].innerHTML,
              manufacturer: rows[i].children[rowsEnum.manufacturer].innerHTML,
              manufactureDate: rows[i].children[rowsEnum.manufactureDate].innerHTML,
              players: rows[i].children[rowsEnum.players].innerHTML
            }
          );
        }
        if (tables.length === 0) {
          return reject("Error parsing body. Table length 0");
        }
        return resolve(tables);
      }
    );
  });
}

function fetchAndParseTables(req, res, next) {
  return fetch(
    'http://www.ipdb.org/lists.cgi?anonymously=true&list=games&submit=No+Thanks+-+Let+me+access+anonymously'
  ).then(
    (fetchResults) => fetchResults.text()
  ).then(
    (html) => parseBody(html)
  ).then(
    (tables) => {
      res.locals.tables = tables;
      return next();
    }
  ).catch(
    (err) => {
      return res.status(500).send(err);
    }
  );
}

router.use(
  fetchAndParseTables,
  updateTablesDB
);


module.exports = router;
