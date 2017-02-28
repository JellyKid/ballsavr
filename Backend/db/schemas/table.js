const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  name: String,
  manufactureDate: String,
  desc: String,
  specialNotes: String,
  localimg: String,
  manufacturer: String,
  ipdb_id: Number,
  enabled: {type: Boolean, default: false}
});

schema.set('timestamps', true);

module.exports = schema;
