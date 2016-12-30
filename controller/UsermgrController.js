var app = angular.module('app', ["ngResource"]);

app.controller("MainCtrl", function($scope, $resource, $window) {
  var Student = $resource("../students.php", {ID: "@ID"});
  $scope.students = Student.query();
  $scope.add = function() {
    Student.save($scope.new_student, function() {
      alert("add");
      $window.location.reload();
    });
  };

//$scope.students = [{'id':1, 'name':'test', 'password':'password', 'mail':'aaa@bb.cc'}];
});

app.controller("DetailCtrl", function($scope, $window) {
  $scope.update = function() {
    $scope.student.$save(function() {
      alert("update");
    });
  };
  $scope.delete = function(index) {
    $scope.student.$delete();
    alert("delete");
    $window.location.reload();
  };
});
