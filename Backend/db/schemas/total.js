const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    player: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    round: {type: mongoose.Schema.Types.ObjectId, ref: 'round'},
    value: {type: Number, default: 0}
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

module.exports = schema;
