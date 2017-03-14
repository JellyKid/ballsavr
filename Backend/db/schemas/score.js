const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    player: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'event'},
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'round'},
    table: {type: mongoose.Schema.Types.ObjectId, ref: 'table'},
    group: [{type: mongoose.Schema.Types.ObjectId, ref: 'table'}],
    points: Number,
    score: Number
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

module.exports = schema;
