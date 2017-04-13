const path = require('path');
const mongoose = require('mongoose');
const schema = require(path.normalize('../schemas/round'));

module.exports = mongoose.model('round', schema, 'rounds');
