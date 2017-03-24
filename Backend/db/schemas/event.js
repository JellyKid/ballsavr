const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    title: String,
    subtitle: String,
    type: String,
    description: String,
    localimg: String,
    extlink: String,
    enabled: {type: Boolean, default: true},
    start: Date,
    active: {type: Boolean, default: true}
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

schema.index({title: "text"});

module.exports = schema;
