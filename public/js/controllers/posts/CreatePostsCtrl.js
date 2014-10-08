'use strict';


(function(){

  app.controller('CreatePostsCtrl', function($scope, $http, $location, $upload, $rootScope, User) {
        $scope.imageUploads = [];

        $scope.post = {};
        $scope.image;
        $scope.user = {};
        $http.get('/profile')
          .success(function (user) {
            console.log(user);
            $scope.loggedIn = true;
            $scope.user = user;
          }).error(function(data, status, headers, config) {
            $scope.loggedIn = false;
            console.log($scope.notLoggedIn)
          });

        function uploadImage(file) {
            console.log("file being uploaded", file);
            var name = Math.round(Math.random()*10000) + '$' + file.name;
            delete file.name;
            file['name'] = name;
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
            .then(function(response) {
                console.log("response", response)
            });
        }
        $scope.submitPost = function(post) {
            console.log("post", post);
            if(post.title == undefined || post.caption == undefined || $scope.image == undefined){
                return;
            } else {
            uploadImage($scope.image);
            console.log("image", $scope.image);
            $scope.post.user = $scope.user._id;
            $scope.post.imgRef = $scope.image.name;
            console.log("post about to send", post);
            $http.post('/api/posts', $scope.post).success(function(response) {
                console.log("successfull res", response);
            }).then(function(){
                $location.path('/app');
            })
            
            $scope.post = {};
            }
        }

        $scope.onFileSelect = function ($files) {
            $scope.image = $files[0];
        };
            
        
      });



})();