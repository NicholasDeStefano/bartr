'use strict';

(function(){

  app.controller('UsersCtrl', function($scope, $route, $upload, $http, $location, User) {

    $scope.user;

    $http.get('/profile')
      .success(function (user) {
        console.log(user);
        $scope.user = user;
        $scope.LoggedIn = true;
        console.log($scope.LoggedIn)
      }).error(function(data, status, headers, config) {
        $scope.LoggedIn = false;
        console.log($scope.notLoggedIn)
      });
    $scope.s3Url = "https://s3.amazonaws.com/bartr-imgs/s3UploadExample/";
    $scope.image;
    $scope.usersLikes = [];
    $http.get('/api/posts')
      .success(function (posts) {
        posts.forEach(function (post) {
          if(post.likes.length > 0){
            post.likes.forEach(function (like) {
              if(like === $scope.user._id) {
                $scope.usersLikes.push(post);
              }
            })
          }
        })
      })
    $scope.showComments = false;
    $scope.openComments = function() {
      $scope.showComments = !$scope.showComments;
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
                    'key' : 's3UploadExample/' + $scope.user._id,
                    'acl' : 'public-read',
                    'Content-Type' : file.type,
                    'AWSAccessKeyId': s3Params.AWSAccessKeyId,
                    'success_action_status' : '201',
                    'Policy' : s3Params.s3Policy,
                    'Signature' : s3Params.s3Signature
                },
                file: file,
            });
        })
    }

    $scope.updateUser = function (user) {
      uploadImage($scope.image);
      // $scope.user.imgRef = $scope.image.name;
      $http.post('/api/users/:id', $scope.user).success(function(response) {
          console.log(response);
      }).then(function(){
          $location.path('/app');
      })
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


  })


})();