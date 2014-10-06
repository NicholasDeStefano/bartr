var mongoose = require('mongoose'),
    CommentSchema = require('../models/comment.js'),
    Comment = mongoose.model('Comment')

exports.create = function (req, res){
  console.log(req.body);
  Comment.create(req.body, function (err, comment){
    if(err) {
      console.log(err);
      return res.status(403); }
    res.send({comment: comment});
  });
}