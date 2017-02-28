const mongoose = require('mongoose');
const userSchema = require('../schemas/table');

module.exports = mongoose.model('table', userSchema, 'tables');
