'use strict';

var app = angular.module('bartr', ['ngRoute', 'ngResource', 'angularFileUpload']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      { templateUrl:"/views/partials/sessions/landing.html",    controller:"IndexCtrl" }
    )
    .when('/login',
      { templateUrl:"/views/partials/sessions/login.html",   controller:"LoginCtrl" }
    )
    .when('/signup',
      { templateUrl:"/views/partials/sessions/signup.html",  controller:"SignupCtrl" }
    )
    .when('/profile',
      { templateUrl: "views/partials/profile.html", controller: "UsersCtrl" }
    )
    .when('/likes',
      { templateUrl: "views/partials/likes.html",   controller: "UsersCtrl" }
    )
    .when('/app',
      { templateUrl: "views/partials/app.html",     controller: "MainCtrl" }
    )
    .when('/posts',
      { templateUrl: "views/partials/posts/posts.html",   controller: "CreatePostsCtrl" }
    )
    .when('/posts/:id',
      { templateUrl: "views/partials/posts/post.html",   controller: "ViewPostCtrl" }
    )
})
app.run(function($rootScope, $http, $route, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      $http.get('/profile')
        .success(function (user) {
          if(next.$$route.originalPath === "/login") {
            if(user) {
              $location.path('/app')
            } else {
              $location.path("/login")
            }
          } else if(next.$$route.originalPath === "/signup") {
            if(user) {
              $location.path('/app');
            } else {
              $location.path('/signup')
            }
          } else {
            if(!user) {
              $location.path("/");
            }
          }

        }).error(function (err) {
          console.log(err);
        })
    })
  })
  .run(function($rootScope) {
    $rootScope.$on('$routeChangeSuccess', function() {
      console.log('route change is finishing')
    })
  })

// app.factory('Data', function(){
//   return { message: "I'm data form a service" }
// })

// app.directive('superman', function() {
//   return {
//     restrict: "E",
//     template: "<div> Here I am to save the day </div>"
//   }
// })
