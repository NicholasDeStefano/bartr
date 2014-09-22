'use strict';


(function(){

  app.controller('PostsCtrl', function($scope, $http, $location, $upload, $rootScope, User) {
    
        $scope.imageUploads = [];

        $scope.post = {};
        $scope.image;
        $scope.user = {};
        $http.get('/profile')
          .success(function (user) {
            console.log(user);
            $scope.user = user;
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
        $scope.submitPost = function(post) {
            // console.log("post", post);
            uploadImage($scope.image);
            console.log("image", $scope.image);
            $scope.post.user = $scope.user._id;
            $scope.post.imgRef = $scope.image.name;
            console.log("post about to send", post);
            $http.post('/api/posts', $scope.post).success(function(response) {
                console.log(response);
            }).then(function(){
                $location.path('/app');
            })
            
            $scope.post = {};
        }

        $scope.onFileSelect = function ($files) {
            $scope.image = $files[0];
        };
            
        
      });



})();