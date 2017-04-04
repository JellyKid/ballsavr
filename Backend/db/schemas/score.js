const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    player: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'event'},
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'round'},
    table: {type: mongoose.Schema.Types.ObjectId, ref: 'table'},
    group: String,
    points: {type: Number, default: 0},
    score: {type: Number, default: 0},
    confirmed: {type: Boolean, default: false}
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

module.exports = schema;
