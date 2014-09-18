'use strict';

(function(){

  app.controller('SignupCtrl', function($scope, $http) {
    
    $http.get("/signup")
      .success(function (data) {
        console.log(data);
      })

    $scope.signup = function(user) {

      $http.post("/signup", user)
        .success(function (user) {
          console.log('user', user);
        })

    }
  

  })


})();