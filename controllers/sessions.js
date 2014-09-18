var config = require('../config/config'),
    crypto = require('crypto'),
    mongoose = require('mongoose'),
    UserSchema = require('../models/user.js'),
    User = mongoose.model('User')

exports.signup = function (req, res) {
  res.send(req.user);
}

exports.login = function (req, res) {
  res.send(req.user);
}

exports.currentUser = function (req, res) {
  res.send(req.user);
}

exports.logout = function (req, res) {
  req.logout();
  res.status(200).json({result: {}});
}