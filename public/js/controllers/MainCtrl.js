'use strict';


(function(){

  app.controller('MainCtrl', function($scope, $http, $location, $upload, $rootScope) {
    
        $http.get("/api/app")
          .success(function (data) {
            console.log(data);
            $scope.posts = data;
         });
        $http.get('/profile')
          .success(function (user) {
            $scope.user = user;
          })

        $scope.addLike = function (post) {
          if(post.likes.length > 0) {

          
          post.likes.forEach(function(like) {
            if(like === $scope.user._id){
              console.log("oh shit dude")
              return;
            } else {
              post.likes.push($scope.user._id);
              $http.post("/api/posts/:id", post)
              .success(function (data) {
                console.log("data returned", data);
              })
            }
          }) 
        } else {
              post.likes.push($scope.user._id);
          $http.post("/api/posts/:id", post)
              .success(function (data) {
                console.log("data returned", data);
              })
        }
            
        }  

        $scope.sendBartr = function (post) {
            alert("Sending Email to letsbartr@gmail.com");
        };


    });


})();