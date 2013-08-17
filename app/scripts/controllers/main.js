'use strict';

angular.module('todoApp')
  .directive('passwordEqual', function() {
    return {
      require: 'ngModel',
      scope: {
        other: '=passwordEqual'
      },
      link: function($scope, $element, $attrs, $ctrl) {
        $scope.$watch(function() {
          if ($ctrl.$viewValue || $scope.other) {
            if ($scope.other !== $ctrl.$viewValue) {
              $ctrl.$setValidity('passwordEqual', false);
              return $ctrl.$viewValue;
            } else {
              $ctrl.$setValidity('passwordEqual', true);
              return $ctrl.$viewValue;
            }
          }

          return false;
        }
        );
      }
    }
  })

  .controller('UserCtrl', function ($scope, $location, $http) {
    $scope.register = function(user) {
      var r = this.registerForm;
      $http.post('/signup', user)
        .success(function(resp) {
          $scope.errorUserExists = false;
          r.$setPristine();
        })
        .error(function(resp, status, headers, config) {
          $scope.errorUserExists = true;
          r.$setPristine();
        });
    };

    $scope.login = function(user) {
      var l = this.loginForm;
      $http.post('/login', user)
        .success(function(resp) {
          $location.path('todo')
        })
        .error(function(resp, status, headers, config) {
          $scope.errorMsg = resp;
          l.$setPristine();
        });
    };
  })

  .controller('ToDoCtrl', function ($scope, $location, $http) {
    $http.get('/todos')
      .success(function(resp) {
        $scope.todos = resp;
      })
      .error(function(resp, status, headers, config) {
        console.log("Could not load ToDos.");
      });
    $scope.order = 'prio';
    $scope.sort = true;

    $scope.edit = function(t) {
      t.edit = true;
    };

    $scope.save = function(t) {
      t.edit = false;
    };

    $scope.delete = function(t) {
      for (var i = $scope.todos.length - 1; i >= 0; i--) {
        if (t.$$hashKey == $scope.todos[i].$$hashKey)
          $scope.todos.splice(i, 1);
      }
    };

    $scope.add = function(t) {
      $scope.todos.push(t);
      $scope.newtodo = {};
    };
  });
