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
          var likes = post.likes;
          var push = true;
          for(var i = 0; i < likes.length; i++){
            if(likes[i] === $scope.user._id){
              console.log("hello");
              push = false;
              break;
            }
          } 
          if(push) {
            post.likes.push($scope.user._id);
            $http.post("/api/posts/:id", post)
            .success(function (data) {
              console.log("data returned", data);
            })
          }              
            
        }  

        $scope.sendBartr = function (post) {
          var post_title = post.title ? post.title : post._id;
          var post_user = post.user ? post.user.local.email : "user no longer exists"
          var info = {
            postTitle: post_title,
            postUser: post_user,
            currUser:  $scope.user.local.email
          }

            $http.post('/submit', info)
              .success(function (data) {
                alert("letsbartr@gmail.com has been emailed about your trade!");
            })
        };


    });


})();