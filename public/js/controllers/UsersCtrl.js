'use strict';

(function(){

  app.controller('UsersCtrl', function($scope, $route, User) {

    $scope.user = new User();
    // $scope.users = User.query();

    User.get({ name:"Nick DeStefano"}, function (user) {
      $scope.nick = user;
    })

  })


})();