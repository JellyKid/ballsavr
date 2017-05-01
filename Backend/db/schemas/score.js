const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    player: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'round'},
    table: {type: mongoose.Schema.Types.ObjectId, ref: 'table'},
    group: String,
    points: {type: Number, default: 0},
    value: {type: Number, default: 0},
    confirmed: {type: Boolean, default: false},
    confirmedBy: {type: mongoose.Schema.Types.ObjectId, ref: 'user'}
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

module.exports = schema;
