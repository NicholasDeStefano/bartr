'use strict';

var app = angular.module('bartr', ['ngRoute', 'ngResource', 'angularFileUpload']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      { templateUrl:"/views/partials/home.html",    controller:"MainCtrl" }
    )
    .when('/login',
      { templateUrl:"/views/partials/login.html",   controller:"LoginCtrl" }
    )
    .when('/signup',
      { templateUrl:"/views/partials/signup.html",  controller:"SignupCtrl" }
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
      { templateUrl: "views/partials/posts.html",   controller: "PostsCtrl" }
    )
})
app.run(function($rootScope, $http, $route, $location) {
    $rootScope.$on('$routeChangeStart', function(event, next, current) {
      console.log("event", event);
      console.log("next", next);
      var nextRoute = next ? next.$$route.originalPath : null;
      var curRoute = current ? current.$$route.originalPath : null;
      console.log("current", current);


      $http.get('/profile')
        .success(function (user) {
          if(nextRoute === "/login") {
            if(user) {
              $location.path('/app')
            } else {
              $location.path("/login")
            }
          } else if(nextRoute === "/signup") {
            if(user) {
              $location.path('/app');
            } else {
              $location.path('/signup')
            }
          } else {
            if(user) {
              $location.path(nextRoute);
            } else {
              $location.path("/login");
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
