const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,
    prev: {type: mongoose.Schema.Types.ObjectId, ref: 'round'},
    next: {type: mongoose.Schema.Types.ObjectId, ref: 'round'},
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'event'},
    tables: [{type: mongoose.Schema.Types.ObjectId, ref: 'table'}],
    groups: [
      {
        name: String,
        players: [{type: mongoose.Schema.Types.ObjectId, ref: 'user'}]
      }
    ],
    running: {type: Boolean, default: false},
    start: Date,
    end: Date
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

module.exports = schema;
