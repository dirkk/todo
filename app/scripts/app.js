'use strict';

angular.module('todoApp', [])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'UserCtrl'
      })
      .when('/register', {
        templateUrl: 'views/register.html',
        controller: 'UserCtrl'
      })
      .when('/todo', {
        templateUrl: 'views/todo.html',
        controller: 'ToDoCtrl'
      })
      .otherwise({
        redirectTo: '/'
      });
  });
