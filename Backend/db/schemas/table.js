const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    manufactureDate: String,
    desc: String,
    specialNotes: String,
    rulesheet: String,
    localimg: String,
    manufacturer: String,
    ipdb_id: Number,
    enabled: {type: Boolean, default: false}
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

schema.index({name: "text"});

schema.statics.findByName = function(name, cb){
  return this.find({
    name: {
      $regex: new RegExp(name, 'i')
    }
  }, cb);
};


module.exports = schema;
