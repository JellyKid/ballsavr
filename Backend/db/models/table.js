const mongoose = require('mongoose');
const schema = require('../schemas/table');

module.exports = mongoose.model('table', schema, 'tables');
