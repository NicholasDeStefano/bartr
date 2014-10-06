var mongoose = require('mongoose'),
    PostSchema = require('../models/post.js'),
    Post = mongoose.model('Post')

exports.index = function (req, res) {
  Post.find(req.query).populate('user').sort({ 'created': 'desc' }).exec(function (err, posts) {
      if(err){
        console.log("ERROR ", err);
      }
      res.send(posts);
    })
}

exports.create = function (req, res) {
  Post.create(req.body, function (err, post){
    if(err) {
      console.log(err);
      return res.status(403); }
    res.send({post: post});
  });
}

exports.update = function (req, res) {
  console.log(req.body);
  var postId = req.body._id;
  delete req.body.user;
  delete req.body._id;
  Post.findByIdAndUpdate(postId, req.body, function (err, post) {
    console.log(err);
    res.send({post: post});
  });
}

exports.post = function (req, res) {
  var postId = req.params.id;
  console.log("body", req.body);
  console.log("query", req.query);
  Post.findById(postId, function (err, post){
    console.log(err);
    res.send({post: post});
  });
}

exports.delete = function (req, res) {
  var postId = req.params.id;
  console.log(postId);
  Post.remove({_id: postId}, function (err, post){
    console.log(err);
    res.send({});
  });

}