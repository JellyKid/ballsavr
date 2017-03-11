const path = require('path');
const mongoose = require('mongoose');
const schema = require(path.normalize('../schemas/event'));

module.exports = mongoose.model('event', schema, 'events');
