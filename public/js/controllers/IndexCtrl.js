'use strict';


(function(){

  app.controller('IndexCtrl', function($scope, $http, $location, $upload, $rootScope) {

    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log("route change on index cntrl");
      if($location.path() === '/app') {
        $scope.backFeed = false;
      } else {
        $scope.backFeed = true;
      }
    });
    // if($location.path() === '/login') {
    //   console.log("login page");
    //   $scope.indexTest = "hideNav";
    // } else if($location.path() === '/app'){
    //   console.log("app page");
    //   $scope.indexTest = "showNav";
    // } else if($location.path() === '/likes'){
    //   console.log("likes page");
    //   $scope.indexTest = "showNav";
    // }






  })
})();