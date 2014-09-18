app.factory('User', function UserFactory($resource) {
    return $resource("/api/users/:id", { id: '@id' },
      {
        'get': {method: 'GET', isArray:true}
      }
    );
})