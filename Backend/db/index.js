const path = require('path');

const envFile = path.join(__dirname, '../.env');
const env = require(path.normalize('../helper/getEnv'))('DB',envFile);
const mongoose = require('mongoose');

const server = env.get('HOST') || 'localhost';
const database = env.get('database') || 'TCP';

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://' + server + '/' + database);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
  console.log(`Database ${database} successfully connected`);
});
