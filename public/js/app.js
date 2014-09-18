'use strict';

var app = angular.module('bartr', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl:"/views/partials/home.html",
        controller:"MainCtrl"
      }
    )
    .when('/login',
      {
        templateUrl:"/views/partials/login.html",
        controller:"LoginCtrl"
      }
    )
    .when('/signup',
      {
        templateUrl:"/views/partials/signup.html",
        controller:"SignupCtrl"
      }
    )
    .when('/profile',
      {
        templateUrl: "views/partials/profile.html",
        controller: "UsersCtrl"        
      }
    )
    .when('/app',
      {
        templateUrl: "views/partials/app.html",
        controller: "MainCtrl"        
      }
    )
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
