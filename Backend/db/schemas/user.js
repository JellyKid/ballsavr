const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  email: String,
  initials: {type: String, default: 'AAA'},
  hash: {type: String, select: false},
  facebook: String,
  score: {type: Number, default: 0},
  admin: {type: Boolean, default: false},
  enabled: {type: Boolean, default: false},
  meta: {
    authType: {type: String, default: 'local'},
    active: {type: Boolean, default: false},
    invitationSent: Date,
    verificationToken: {type: String, select: false}
  }
});

schema.set({
  timestamps: {
    createdAt: 'meta.createdAt',
    updatedAt: 'meta.updatedAt'
  }
});

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
