'use strict';


(function(){

  app.controller('CreatePostsCtrl', function($scope, $http, $location, $upload, $rootScope, User) {
        $scope.imageUploads = [];
        $scope.page = {};
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
            
            var name = Math.round(Math.random()*10000) + '$' + file.name;
            delete file.name;
            file['name'] = name;
            $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response){
                $scope.page.mobileTest = "get request is being made";

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
                    $scope.page.mobileTest = "file was uploaded sucessfully";

                    $scope.post.user = $scope.user._id;
                    $scope.post.imgRef = config.file.name;
                    $http.post('/api/posts', $scope.post).success(function(response) {
                        console.log("successfull res", response);
                    }).then(function(){
                        $location.path('/app');
                    })
                }).error(function(){
                $scope.page.mobileTest = "Something went wrong.";

                    $scope.page.wrong = "Something went wrong...";
                })
            }).error(function(){
                $scope.page.mobileTest = "Something went wrong.";
            })
        }
        $scope.submitPost = function(post) {
            $scope.page.mobileTest = "submitPost function has been run.";
            if(!post.title || !post.caption || !$scope.image){
                $scope.page.error = "You need a title, image, and caption.";
            } else {
            $scope.page.mobileTest = "it seems all the properties are accounted for.";
            var file = $scope.image;
            var name = Math.round(Math.random()*10000) + '$' + file.name;
            delete file.name;
            file['name'] = name;
            $http.get('/api/s3Policy?mimeType='+ file.type).success(function(response){
                $scope.page.mobileTest = "get request is being made";

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
                    $scope.page.mobileTest = "file was uploaded sucessfully";

                    $scope.post.user = $scope.user._id;
                    $scope.post.imgRef = config.file.name;
                    $http.post('/api/posts', $scope.post).success(function(response) {
                        console.log("successfull res", response);
                    }).then(function(){
                        $location.path('/app');
                    })
                }).error(function(){
                $scope.page.mobileTest = "Something went wrong.";

                    $scope.page.wrong = "Something went wrong...";
                })
            }).error(function(){
                $scope.page.mobileTest = "Something went wrong.";
            })
            }
        }

        // $scope.submitPost = function (post) {
        //     console.log(post);
        // }

        $scope.onFileSelect = function ($files) {
            $scope.image = $files[0];
            $scope.page.mobileTest = "an image has been uploaded";
        };
            
        
      });



})();