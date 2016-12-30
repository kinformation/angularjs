app.controller('RegistCtrl', function($scope, $location, $resource){
  var registModel = $resource("model/UserModel.php?", {id:"id"}, {
    regist: {method: 'POST', params:{q:'regist'}},
     check: {method: 'GET', params:{q:'check'}}
  });
  $scope.regist = function(){
    r = registModel.check({mail:$scope.mail}, function(){
      if(!!r.errorInfo || typeof r.result === "undefined"){
        $scope.err_mail_duplication = "db error";
        console.log(r);
      } else {
        if(r.result){
          var data;
          var reg = registModel.regist({name:$scope.username, password:$scope.password, mail:$scope.mail}, function(){
            console.log(reg);
          });
          $location.path('/registComplete');
        } else {
          $scope.err_mail_duplication = "このメールアドレスは既に使用されています";
          $scope.mail = "";
        }
      }
    });
  };

  $scope.gologin = function(){
    $location.path('/login');
  };
});
