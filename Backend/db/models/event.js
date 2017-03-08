const mongoose = require('mongoose');
const schema = require('../schemas/event');

module.exports = mongoose.model('event', schema, 'events');
