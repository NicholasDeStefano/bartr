module.exports = function(app, passport) {

  // Users
  var users = require('../controllers/users');
  app.get('/api/users', users.index);
  app.post('/api/users', users.create);
  app.get('/api/users/:id', users.show);
  app.post('/api/users/:id', users.update);

  app.get('/home', function(req, res) {
    res.send("hello world"); // load the index.jade file
  });

  // Mailgun
  var mail = require('../controllers/mailer.js');
  app.post('/submit', mail.testEmail);

  // Posts
  var posts = require('../controllers/posts');
  app.post('/api/posts', posts.create);
  app.post('/api/posts/:id', posts.update);
  app.get('/api/posts', posts.index);
  app.get('/api/posts/:id', posts.post);
  app.delete('/api/posts/:id', posts.delete);

  app.post('/api/posts/:id/comments', posts.addComment)


  app.get('/api/app', isLoggedIn, posts.index);

  //Session
  var sessions = require('../controllers/sessions');
  app.post('/signup', passport.authenticate('local-signup', { failureFlash : true }), sessions.signup);
  app.post('/login', passport.authenticate('local-login', { failureFlash : "Invalid Shit" }), sessions.login);
  app.get('/profile', sessions.currentUser);
  app.get('/logout', sessions.logout);
  // app.get('/login', function(req, res) {
  //   res.send('loggin in bitches', { message: req.flash('loginMessage') }); 
  // });
  // app.get('/signup', function(req, res) {
  //   res.send('signing up bitch', { message: req.flash('signupMessage') });
  // });

  // AWS 
  var api = require('../controllers/api');
  var aws = require('../controllers/aws');

  app.get('/api/config', api.getClientConfig);
  app.get('/api/s3Policy', aws.getS3Policy);

}

function isLoggedIn(req, res, next) {
  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.status(404).json({});
  return;
}
