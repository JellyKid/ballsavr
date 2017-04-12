const path = require('path');

const envFile = path.join(__dirname, '../../.env');
const env = require(path.normalize('../helper/getEnv'))('DB',envFile);
const mongoose = require('mongoose');

const server = env.get('HOST') || 'localhost';
const database = env.get('database') || 'TCP';

mongoose.Promise = global.Promise;
mongoose.set('debug', env.get('debug'));
mongoose.connect('mongodb://' + server + '/' + database);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Database ${database} successfully connected`);
});

//for persistent sessions across reboots
const mongoDBstore = require('connect-mongodb-session')(require('express-session'));
const store = new mongoDBstore(
  {
    uri: 'mongodb://' + server + '/' + database,
    collection: 'persistentSessions'
  }
);

store.on('error', function(error) {
      if(error){
        console.log(`MongoDBStore error: ${error}`);
      }
});

module.exports = store;
