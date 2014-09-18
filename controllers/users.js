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