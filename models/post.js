var mongoose = require('mongoose'),
    UserSchema = require('../models/user.js'),
    User = mongoose.model('User'),
    Schema = mongoose.Schema

// define the schema for our user model
var PostSchema = mongoose.Schema({
  created: { type: Date, default: Date.now },
  title: String,
  imgRef: String,// create the model for users and expose it to our app
  caption: String,
  likes: { type: Number, default: 0 },
  user: { type: Schema.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Post', PostSchema);