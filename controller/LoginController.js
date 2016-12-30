app.controller('LoginCtrl', function($scope, $location, AuthService){
  $scope.login = function(){
    $scope.disabled = true;
    AuthService.login($scope.mail, $scope.password)
    .then(function(){
      $location.path('/');
    })
    .catch(function(){
      $scope.alert = {msg: "Login failed"};
    })
    .finally(function(){
      $scope.mail = "";
      $scope.password = "";
      $scope.disabled = false;
    });
  };
  $scope.goregist = function(){
    $location.path('/regist');
  };
});
