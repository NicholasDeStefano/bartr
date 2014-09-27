'use strict';

(function(){

  app.controller('LoginCtrl', function($rootScope, $scope, $http, $location) {
    console.log($scope);
    $http.get("/login").success(function (data) {
      console.log(data);
    });

    $scope.login = function (user) {
      $http.post("/login", user).success(function (user) {
        $location.path('/profile');
      });
    };
  });
})();