const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: String,
  year: String,
  desc: String,
  specialNotes: String,
  localimg: String,
  meta: {
    enabled: {type: Boolean, default: false}
  }
});

schema.set('timestamps', true);

module.exports = schema;
