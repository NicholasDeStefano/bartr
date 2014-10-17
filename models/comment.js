var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
  body: String,
  user: { 
    username: String,
    imgRef: String
  },
  post: { type: Schema.ObjectId, ref: 'Post' }
});

mongoose.model('Comment', CommentSchema);