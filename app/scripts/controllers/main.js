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

  .controller('UserCtrl', function ($scope, $location) {
    $scope.register = function(user) {

    };

    $scope.login = function(user) {
      console.log(user);
      // check login data
      if (true) {
        $location.path('todo')
      }
    };
  })

  .controller('ToDoCtrl', function ($scope, $location) {
    $scope.todos = [{task: "one", prio: 1}, {task: "kjdsf", prio: 21}, {task: "whatever man", prio: 11}];
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
