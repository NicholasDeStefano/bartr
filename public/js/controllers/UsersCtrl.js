'use strict';

(function(){

  app.controller('UsersCtrl', function($scope, $route, $http, $location, User) {

    $http.get('/profile')
      .success(function (user) {
        console.log(user);
        $scope.user = user;
      })
    $scope.logout = function (user) {
      console.log("you are trying to log out");
      $http.get('/logout')
        .success(function () {
          console.log("you've been logged out");
        }).then(function(result){
          $location.path('/login');
        })
    }     


  })


})();