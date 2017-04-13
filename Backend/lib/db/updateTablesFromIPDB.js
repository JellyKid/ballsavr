const path = require('path');
const router = require('express').Router();

const checkAuth = require(path.normalize('../auth/checkAuth'));
const getCurrentUser = require(path.normalize('../db/getCurrentUser'));
const isAdmin = require(path.normalize('../auth/isAdmin'));

const fetch = require('node-fetch');
const jsdom = require('jsdom');
const Table = require('../../db/models/Table');

const rowsEnum = { //enum of rows content
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
        let tables = []; //tables array to return

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



function updateOrAddTables(tables) {
  return new Promise((resolve, reject) => {
    tables.forEach((table) => {
      console.log(`Adding table ${table.name}`);
      Table.findOneAndUpdate(
        {name: table.name}, //table to find
        { //updated info
          name: table.name,
          manufacturer: table.manufacturer,
          manufactureDate: table.manufactureDate,
          players: table.players
        },
        {
          upsert: true,
          setDefaultsOnInsert: true,
          runValidators: true
        },
        (err) => {
          if(err){
            console.log(`ERROR: ${err}`);
            return reject(err);
          }
        }
      );
    });
    return resolve();
  });
}

function fetchAndParseTables(req, res, next) {
  return fetch(
    'http://www.ipdb.org/lists.cgi?anonymously=true&list=games&submit=No+Thanks+-+Let+me+access+anonymously'
  ).then(
    (raw) => raw.text()
  ).then(
    (html) => parseBody(html)
  ).then(
    (tables) => updateOrAddTables(tables)
  ).then(
    () => next()
  ).catch(
    (err) => {
      return res.status(500).send(err);
    }
  );
}

router.get(
  '/updateTablesFromIPDB',
  // checkAuth,
  // getCurrentUser,
  // isAdmin,
  fetchAndParseTables,
  (req,res) => res.status(200).send("Tables updated")
);


module.exports = router;
