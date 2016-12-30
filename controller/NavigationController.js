app.controller('NavCtrl', function($scope, $location, AuthService){
  $scope.$watch(
    function(){ return AuthService.getUser() },
    function(newVal, oldVal){ $scope.user = newVal }
  );
  $scope.logout = function(){
    AuthService.logout().finally(function(){ $location.path('/login')});
  };
});
