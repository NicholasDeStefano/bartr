'use strict';

(function(){

  app.controller('UsersCtrl', function($scope, $route, $upload, $http, $location, User) {

    $scope.user;

    $http.get('/profile')
      .success(function (user) {
        console.log(user);
        $scope.user = user;
      })

    $scope.image;
    $scope.usersLikes = [];
    $http.get('/api/posts')
      .success(function (posts) {
        console.log("posts returned for user", posts);
        posts.forEach(function (post) {
          console.log(post);
          if(post.likes.length > 0){
            posts.likes.forEach(function (like) {
              if(like === $scope.user._id) {
                console.log("you da fucking man")
              }
            })
          }
        })
      })

    function uploadImage(file) {
        $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response){
            var s3Params = response;
            $scope.image = $upload.upload({
                url: 'https://bartr-imgs.s3.amazonaws.com/',
                method: 'POST',
                data: {
                    'key' : 's3UploadExample/' + file.name,
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
      $scope.user.imgRef = $scope.image.name;
      $http.post('/api/users/:id', $scope.user).success(function(response) {
                console.log(response);
            }).then(function(){
                $location.path('/profile');
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