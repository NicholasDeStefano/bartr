var config = require('../config/config'),
    crypto = require('crypto'),
    mongoose = require('mongoose'),
    UserSchema = require('../models/user.js'),
    User = mongoose.model('User'),
    Mailgun = require('mailgun-js'),
    config = require('../config/mailgun.js');

exports.signup = function (req, res) {
  var mailgun = new Mailgun({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});
  var data = {
    from: config.mailgun.from_who,
    to: [req.body.email, 'letsbartr@gmail.com'],
    subject: 'Welcome to Bartr!',
    html: 'Congratulations on joining bartr ' + req.body.email + '! We are happy to have you and any questions please email us letsbartr@gmail.com'
  }
  //Invokes the method to send emails given the above data with the helper library
  mailgun.messages().send(data, function (err, body) {
      if (err) {
          res.send('error', { error : err});
          console.log("got an error: ", err);
      }
      else {
          res.send(req.user);
      }
  });  
}

exports.login = function (req, res) {
  res.send(req.user);
}

exports.currentUser = function (req, res) {
  // console.log("req", req);
  res.send(req.user);
}

exports.logout = function (req, res) {
  req.logout();
  res.status(200).json({result: {}});
}