var mongoose = require('mongoose'),
    Schema = mongoose.Schema

// define the schema for our user model
var PostSchema = mongoose.Schema({
  created: { type: Date, default: Date.now },
  title: String,
  imgRef: String,// create the model for users and expose it to our app
  caption: String,
  likes: [{ type: Schema.ObjectId, ref: 'User' }],
  user: { type: Schema.ObjectId, ref: 'User' },
  comments: [{ type: Schema.ObjectId, ref: 'Comment' }]
});

module.exports = mongoose.model('Post', PostSchema);