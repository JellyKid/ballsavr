const path = require('path');
const mongoose = require('mongoose');
const schema = require(path.normalize('../schemas/total'));

module.exports = mongoose.model('total', schema, 'totals');
