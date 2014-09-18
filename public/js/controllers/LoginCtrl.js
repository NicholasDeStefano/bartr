'use strict';

(function(){

  app.controller('LoginCtrl', function($scope, $http, $location) {
    
    $http.get("/login")
      .success(function (data) {
        console.log(data);
      })

    $scope.login = function (user) {
    
      $http.post("/login", user)
        .success(function (user) {
          $location.path('/profile');
        })
    }

  })


})();