'use strict';


(function(){

  app.controller('MainCtrl', function($scope, $http, $location, $upload, $rootScope) {
    
        $http.get("/api/app")
          .success(function (data) {
            console.log(data);
            $scope.posts = data;
         })

        $scope.addLike = function (post) {
          console.log(post);
          if(!post.likes) {
            post.likes = 1
            $http.post("/api/posts/:id", post)
            .success(function (data) {
              $scope.post = data;
            })
          } else {
            post.likes = post.likes + 1;
            $http.post("/api/posts/:id", post)
            .success(function (data) {
              $scope.post = data;
            })
          };
            
        }  

        $scope.sendBartr = function (post) {
            alert("Sending Email to letsbartr@gmail.com");
        };


    });


})();