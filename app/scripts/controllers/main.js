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
          $location.path("/todo");
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
          $scope.errorMsg = resp.message;
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
        if (status == 401) {
          $location.path("/");
        } else {
          console.log("Could not load ToDos.");
        }
      });
    $scope.order = 'prio';
    $scope.sort = true;
    $scope.newtodo = { prio: 1 };

    $scope.edit = function(t) {
      t.edit = true;
    };

    $scope.save = function(t) {
      $http.put('/todo/edit/' + t._id, {"task": t.task, "prio": t.prio})
        .success(function(resp) {
          t.edit = false;
        })
        .error(function(resp, status, headers, config) {
          t.edit = false;
          console.log("Could not edit this ToDo.");
        });
    };

    $scope.delete = function(t) {
      $http.delete('/todo/delete/' + t._id)
        .success(function(resp) {
          for (var i = $scope.todos.length - 1; i >= 0; i--) {
            if (t._id == $scope.todos[i]._id)
              $scope.todos.splice(i, 1);
          }
        })
        .error(function(resp, status, headers, config) {
          console.log("Could not delete this ToDo.");
        });
    };

    $scope.add = function(t) {
      $http.post('/todo/add', t)
        .success(function(resp) {
          $scope.todos.push(t);
          $scope.newtodo = {prio: 1};
        })
        .error(function(resp, status, headers, config) {
          console.log("Could not add this ToDo.");
        });
    };
  });
