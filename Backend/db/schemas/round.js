const mongoose = require('mongoose');
const Score = require('../models/Score');

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
    end: Date,
    progress: {type: Number, default: 0, min: 0, max: 100}
  },
  {
    timestamps: {
      updatedAt: "meta.updatedAt",
      createdAt: "meta.createdAt"
    }
  }
);

schema.virtual('currentProgress').set(
  function(numerator){
    this.progress = Math.floor((numerator/(this.players.length*this.tables.length))*100);
  }
);

module.exports = schema;
