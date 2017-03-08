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
    end: Date,
    rounds : [
      {
        name: String,
        order: Number,
        start: Date,
        end: Date,
        tables: [{type: mongoose.Schema.Types.ObjectId, ref: 'table'}]
      }
    ]
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
