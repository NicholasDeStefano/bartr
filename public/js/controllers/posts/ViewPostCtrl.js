'use strict';


(function(){

  app.controller('ViewPostCtrl', function($scope, $http, $routeParams, $location, $upload, $rootScope, User) {
    console.log($routeParams);
    $http.get('api/posts/'+ $routeParams.id).success(function(data){
      console.log(data);
      $scope.post = data.post;
    })
    $scope.image = {};
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
        $scope.updatePost = function(post) {
            console.log("post", post);
            if($scope.image.name == undefined){
              console.log("no image was updated")
            } else {
              uploadImage($scope.image);
              $scope.post.imgRef = $scope.image.name;

            }
            console.log("image", $scope.image);
            // $scope.post.user = $scope.user._id;
            console.log("post about to send", post);
            $http.post('/api/posts/:id', $scope.post).success(function(response) {
                console.log("successfull res", response);
            }).then(function(){
                $location.path('/app');
            })
            
        }

        $scope.onFileSelect = function ($files) {
          console.log($files);
          $scope.image = $files[0];
        };

        $scope.deletePost = function(post) {
          console.log($routeParams)
          $http.delete('/api/posts/'+ $routeParams.id).success(function(response){
            console.log(response);
          })
          .then(function(){
            $location.path('/app');
          })
        }

  });


})();