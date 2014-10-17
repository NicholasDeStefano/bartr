'use strict';

(function(){

  app.controller('MainCtrl', function($scope, $http, $location, $upload, $rootScope) {
        $http.get('/profile')
          .success(function (user) {
            console.log("user", user);
            $scope.user = user;
          })

        $http.get("/api/app")
          .success(function (data) {
            var userId = $scope.user._id;
            var _data = data.map(function(post){
              post.likes.forEach(function(like){
                if(like === userId){
                  post.userLike = true;
                  return post;
                }
              })
            })
            console.log(data);
            $scope.posts = data;
         });
        

        $scope.showComments = false;
        $scope.openComments = function(post) {
          console.log("opening post", post);
          $scope.post = post;
          $scope.post.showComments = !$scope.post.showComments;
        }
        $scope.addLike = function (post) {
          var likes = post.likes;
          var push = true;
          for(var i = 0; i < likes.length; i++){
            if(likes[i] === $scope.user._id){
              var rm = likes.indexOf(likes[i]);
              post.likes.splice(rm, 1);
              post.userLike = false;
              push = false;
              $http.post("/api/posts/"+post._id, post)
              .success(function (data) {
                console.log("data returned", data);
              })
            }
          } 
          if(push) {
            post.likes.push($scope.user._id);
            post.userLike = true;
            $http.post("/api/posts/"+post._id, post)
            .success(function (data) {
              console.log("data returned", data);
            })
          }               
        }
        $scope.comment = {};
        $scope.addComment = function(post, comment) {
          console.log('post', post);
          console.log('comment', comment);
          console.log("user", $scope.user);
          var c = {
            body: comment.body,
            user: {
              username: $scope.user.local.username,
              imgRef: $scope.user.imgRef
            },
            post: post._id
          };
          console.log(c);
          post.comments.push(c);
          $http.post('/api/posts/'+post._id+'/comments', c).success(function (data){
            console.log(data);
          })
          $scope.comment.body = "";

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
                alert("Bartr request sent.\nCheck your inbox.");
            })
        };


    });


})();