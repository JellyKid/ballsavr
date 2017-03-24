const mongoose = require('mongoose');

const schema = new mongoose.Schema(
  {
    name: String,    
    event: {type: mongoose.Schema.Types.ObjectId, ref: 'event'},
    tables: [{type: mongoose.Schema.Types.ObjectId, ref: 'table'}],
    players: [
      {
        user: {type: mongoose.Schema.Types.ObjectId, ref: 'user'},
        group: String
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
