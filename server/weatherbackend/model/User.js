const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let User = new Schema({
  userkey: {
    type: String
  },
  observedcities: {
    type: [{}]
  }
}, {
  collection: 'users'
})

module.exports = mongoose.model('User', User)