const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    firstName: String,
    lastName: String,
    email: String,
    initials: {type: String, default: 'AAA'},
    hash: {type: String, select: false},
    facebook: {
      id: String,
      accessToken: String,
      profileUrl: String,
      photos: [{value: String}]
    },
    admin: {type: Boolean, default: false},
    enabled: {type: Boolean, default: false},
    meta: {
      authType: {type: String, default: 'local'},
      activated: {type: Boolean, default: false},
      invitationSent: Date,
      verificationToken: {type: String, select: false},
      updatedAt: Date,
      createdAt: Date
    }
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);


schema.statics.findByEmail = function(email, cb){
  return this.find({email: new RegExp(email, 'i')}, cb);
};

schema.statics.findByToken = function(token, cb){
  return this.findOne({'meta.verificationToken' : token}, cb);
};

module.exports = schema;
