const path = require('path');
const mongoose = require('mongoose');
const schema = require(path.normalize('../schemas/score'));

module.exports = mongoose.model('score', schema, 'scores');
