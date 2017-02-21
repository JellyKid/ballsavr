const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  hash: String,
  facebook: String,
  score: {type: Number, default: 0},
  meta: {
    admin: {type: Boolean, default: false},
    authType: {type: String, default: 'local'},
    enabled: {type: Boolean, default: false},
    active: {type: Boolean, default: false},
    invitationSent: {type: Boolean, default: false},
    verificationToken: String
  }
});

schema.set('timestamps', true);

module.exports = schema;
