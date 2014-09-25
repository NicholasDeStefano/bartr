'use strict';

(function(){

  app.controller('LoginCtrl', function($rootScope, $scope, $http, $location) {
    
    $http.get("/login")
      .success(function (data) {
        console.log(data);
      })

    $scope.login = function (user) {
    
      $http.post("/login", user)
        .success(function (user) {
          $rootScope.LoggedIn = true;
          $location.path('/profile');
        })
    }

  })


})();