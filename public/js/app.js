'use strict';

var app = angular.module('bartr', ['ngRoute', 'ngResource']);

app.config(function ($routeProvider) {
  $routeProvider
    .when('/',
      {
        templateUrl:"views/partials/app.html",
        controller:"MainCtrl"
      }
    )
    .when('/users',
      {
        templateUrl: "views/partials/users.html",
        controller: "UsersCtrl"        
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
