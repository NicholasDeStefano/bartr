'use strict';


(function(){

  app.controller('IndexCtrl', function($scope, $http, $location, $upload, $rootScope) {

    
    if($location.path() === '/login') {
      console.log("login page");
      $scope.indexTest = "hideNav";
    } else if($location.path() === '/app'){
      console.log("app page");
      $scope.indexTest = "showNav";
    } else if($location.path() === '/likes'){
      console.log("likes page");
      $scope.indexTest = "showNav";
    }






  })
})();