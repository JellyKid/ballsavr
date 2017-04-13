const path = require('path');
const mongoose = require('mongoose');
const schema = require(path.normalize('../schemas/table'));

module.exports = mongoose.model('table', schema, 'tables');
