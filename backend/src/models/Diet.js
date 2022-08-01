const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let dietSchema = new Schema({
  username: {
    type: String
  },
  diet: {
    type: String
  }
}, {
    collection: 'diets'
  })

module.exports = mongoose.model('Diet', dietSchema)