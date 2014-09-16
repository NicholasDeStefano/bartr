app.provider('User', function() {
  this.$get = ['$resource', function($resource) {
    var User = $resource('http://localhost:1529/api/users/:_id', {}, {
      update: {
        method: 'PUT'
      }
    })

    return User;
  }]
})