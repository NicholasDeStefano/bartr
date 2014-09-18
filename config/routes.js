module.exports = function(app, passport) {

  app.get('/api/test', function (req, res) {
    res.send("Hello World!");
  })

  var users = require('../controllers/users');
  app.get('/api/users', users.index);
  app.post('/api/users', users.create);
  app.get('/api/users/:id', users.show);
  
  app.get('/home', function(req, res) {
    res.send("hello world"); // load the index.jade file
  });

  var posts = require('../controllers/posts');

  app.get('/api/app', isLoggedIn, posts.index);

  app.get('/login', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.send('loggin in bitches', { message: req.flash('loginMessage') }); 
  });


  app.get('/signup', function(req, res) {

    // render the page and pass in any flash data if it exists
    res.send('signing up bitch', { message: req.flash('signupMessage') });
  });

  var sessions = require('../controllers/sessions');
  app.post('/signup', passport.authenticate('local-signup', { failureFlash : true }), sessions.signup);
  app.post('/login', passport.authenticate('local-login', { failureFlash : true }), sessions.login);

  app.get('/profile', isLoggedIn, sessions.currentUser);
  app.get('/logout', sessions.logout);

}

function isLoggedIn(req, res, next) {

  // if user is authenticated in the session, carry on 
  if (req.isAuthenticated())
    return next();

  // if they aren't redirect them to the home page
  res.status(404).json({});
  return;
}
