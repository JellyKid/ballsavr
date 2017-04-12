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
    active: {type: Boolean, default: true},
    rounds: [{type: mongoose.Schema.Types.ObjectId, ref: 'round'}],
    progress: {type: Number, default: 0, min: 0, max: 100}
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
