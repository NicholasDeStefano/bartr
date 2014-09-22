var mongoose = require('mongoose'),
    PostSchema = require('../models/post.js'),
    Post = mongoose.model('Post')

exports.index = function (req, res) {
  Post.find(req.query).populate('user').exec(function (err, posts) {
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
  Post.findByIdAndUpdate(req.body._id, req.body, function (err, post) {
    res.send({post: post});
  });
}