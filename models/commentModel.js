const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const schema = new Schema({
  user_id: { type: Number, required: true },
  img: { type: String, default: "" },
  comment: { type: String, required: true },
  time_stamp: { type: Date, default: Date.now },
  count_like: { type: Number, default: 0 },
  reply: [String]
},{
  collection: 'Comment',
  versionKey: false
});

const comment = mongoose.model('Comment', schema);

module.exports = comment;