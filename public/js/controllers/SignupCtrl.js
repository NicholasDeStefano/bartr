'use strict';

(function(){

  app.controller('SignupCtrl', function($scope, $http, $location) {
    
    $scope.page = {};
    $scope.page.wrongShit = false;  

    $scope.signup = function(user) {
      user.email = user.email.toLowerCase();
      $http.post("/signup", user)
        .success(function (user) {
          $location.path('/profile');
        }).error(function(result){
          console.log("error", result);
          $scope.page.wrongShit = "true";
          console.log($scope.page.wrongShit)
          $scope.page.alert = "That email is already taken.";
        });

    }
  

  })


})();