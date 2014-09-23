var mongoose = require('mongoose'),
    UserSchema = require('../models/user.js'),
    User = mongoose.model('User')

exports.index = function (req, res) {
  User.find(req.query, function (err, user) {
      if(err){
        console.log("ERROR ", err);
      }
      res.send(user);
    })
}

exports.create = function (req, res) {
  User.create(req.body, function(err, user){
    if(err) {return res.status(403); }
    res.send({user: user});
  });
}

exports.show = function (req, res) {
  User.findById(req.params.id, function (err, user) {
    res.send(user);
  })
}

exports.update = function (req, res) {
  console.log("req.body", req.body);
  var userId = req.body._id;
  delete req.body._id;
  User.findByIdAndUpdate(userId, req.body, function (err, user) {
    console.log("error", err);
    console.log("about to send user back", user);
    res.send(user);
  })
}