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
    invitationSent: Date,
    verificationToken: String
  }
});

schema.set('timestamps', true);
// schema.set('collection', 'users');

schema.statics.findByEmail = function(email, cb){
  return this.find({email: new RegExp(email, 'i')}, cb);
};

schema.query.byEmail = function(email){
  return this.find({email: new RegExp(email,'i')});
};

schema.statics.findByToken = function(token, cb){
  return this.findOne({'meta.verificationToken' : token}, cb);
};

module.exports = schema;
