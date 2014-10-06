var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var CommentSchema = new mongoose.Schema({
  body: String,
  user: { type: Schema.ObjectId, ref: 'User' },
  post: { type: Schema.ObjectId, ref: 'Post' }
});

mongoose.model('Comment', CommentSchema);