'use strict';

(function(){

  app.controller('UsersCtrl', function($scope, $route, $upload, $http, $location, User) {

    $scope.user;
    $scope.page = {};
    $scope.usersLikes = [];

    $http.get('/profile')
      .success(function (user) {
        console.log(user);
        $scope.user = user;
        $scope.LoggedIn = true;
        $scope.s3Url = "https://s3.amazonaws.com/bartr-imgs/uploads/" + $scope.user.imgRef;

        console.log($scope.LoggedIn)
      }).error(function(data, status, headers, config) {
        $scope.LoggedIn = false;
        console.log($scope.notLoggedIn)
      });
    $http.get('/api/posts')
      .success(function (posts) {
        posts.forEach(function (post) {
          if(post.likes.length > 0){
            post.likes.forEach(function (like) {
              if(like === $scope.user._id) {
                console.log("heres one!");
                $scope.usersLikes.push(post);
              }
            })
          }
        })
      })
    $scope.showComments = false;
    $scope.openComments = function(post) {
      console.log("opening post", post);
      $scope.post = post;
      $scope.post.showComments = !$scope.post.showComments;
    }
    function uploadImage(file) {
      var name = Math.round(Math.random()*10000) + '$' + file.name;
      delete file.name;
      file['name'] = name;
        $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response){
            var s3Params = response;
            $scope.image = $upload.upload({
                url: 'https://bartr-imgs.s3.amazonaws.com/',
                method: 'POST',
                data: {
                    'key' : 'uploads/' + file.name,
                    'acl' : 'public-read',
                    'Content-Type' : file.type,
                    'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                    'success_action_status' : 'http://localhost:1529/#/app',
                    'Policy' : s3Params.s3Policy,
                    'Signature' : s3Params.s3Signature
                },
                file: file,
            }).progress(function(evt) {
                    $scope.page.upProg = true;
                    $scope.page.progress = parseInt(100.0 * evt.loaded / evt.total);
                }).success(function(data, status, headers, config) {
                    // file is uploaded successfully
                    $scope.user.imgRef = config.file.name;

                    $http.post('/api/users/:id', $scope.user).success(function(response) {
                        console.log(response);
                    }).then(function(){
                        $location.path('/app');
                    })
                }).error(function(){
                    $scope.page.wrong = "Something went wrong...";
                })
        })
    }

    $scope.updateUser = function (user) {
      uploadImage($scope.image);
      
    };

    $scope.onFileSelect = function ($files) {
        $scope.image = $files[0];
    };

    $scope.logout = function (user) {
      console.log("you are trying to log out");
      $http.get('/logout')
        .success(function () {
          console.log("you've been logged out");
        }).then(function(result){
          $location.path('/login');
        })
    }

    $scope.unlike = function (post) {
      console.log(post);
      var result = $scope.usersLikes.filter(function( obj ) {
        return obj._id === post._id;
      });
      post.likes.forEach(function( like ){
        if(like === $scope.user._id){
          var l = post.likes.indexOf(like);
          post.likes.splice(l, 1);
          $http.post("/api/posts/"+post._id, post)
            .success(function (data) {
            $scope.usersLikes.splice(result, 1);
            console.log("data returned", data);
          })
        }
      })
      
      console.log("result", result)
    }


  })


})();