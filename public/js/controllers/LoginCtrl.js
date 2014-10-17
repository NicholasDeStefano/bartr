'use strict';

(function(){

  app.controller('LoginCtrl', function($rootScope, $scope, $http, $location) {
    console.log($scope);
    $scope.page = {};
    $scope.page.wrongShit = false;

    $scope.login = function (user) {
      if(user){
        user.email = user.email.toLowerCase();
        $http.post("/login", user).success(function (user) {
          $location.path('/app');
        })
        .error(function(result){
          console.log("error", result);
          $scope.page.wrongShit = "true";
          console.log($scope.page.wrongShit)
          $scope.page.alert = "You have entered an incorrect email and/or password.";
        });
      } else {
        $scope.page.wrongShit = "true";
        console.log($scope.page.wrongShit)
        $scope.page.alert = "You have entered an incorrect email and/or password.";
      }
    };
  });
})();