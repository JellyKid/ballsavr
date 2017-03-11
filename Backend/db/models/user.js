const path = require('path');
const mongoose = require('mongoose');
const schema = require(path.normalize('../schemas/user'));

module.exports = mongoose.model('user', schema, 'users');
