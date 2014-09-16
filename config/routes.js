module.exports = function(app) {

  app.get('/api/test', function (req, res) {
    res.send("Hello World!");
  })

  var users = require('../controllers/users');
  app.get('/api/users', users.index);
  app.post('/api/users', users.create);
  app.get('/api/users/:id', users.show);
  
}