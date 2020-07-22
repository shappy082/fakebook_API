const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userFaceSchema = Schema({
  username:  { type: String, required: true, trim: true },
  password: { type: String, required: true, trim: true  },
  user_id: { type: Number, required: true, trim: true  }
},{
  collection: 'User_Authen'
});

  
  const user_authen = mongoose.model('user_authen', userFaceSchema);
  
  module.exports = user_authen;