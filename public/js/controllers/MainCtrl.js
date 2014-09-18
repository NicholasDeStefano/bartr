'use strict';

(function(){

  app.controller('MainCtrl', function($scope, $http, $location) {
    
    $http.get("/app/posts")
      .success(function (data) {
        console.log(data);
      })

    $http.get('/profile')
      .success(function (user) {
        console.log(user);
        $scope.user = user;
      })
      
    $scope.logout = function (user) {
      console.log("you are trying to log out");
      $http.post('/logout', user)
        .success(function () {
          console.log("you've been logged out");
        }).then(function(){
          $location.path('/login');
        })
    }    
  

  })


})();