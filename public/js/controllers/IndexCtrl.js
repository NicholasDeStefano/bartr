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
  })
})();