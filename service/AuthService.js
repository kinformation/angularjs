var app = angular.module('app', ['ngRoute', 'ngResource']);

app.factory('AuthService', function($q, $timeout, $resource){
  var _user = null;
  return {
    isLogged: function(){ return !!_user; },
    getUser: function(){ return _user; },
    login: function(mail, password){
      var deferred = $q.defer();
      var User = $resource("model/AuthModel.php");
      var result = User.query({mail:mail, password:password}, function() {
         console.log(result);
        $timeout(function(){
          if(result.length>0){
            _user = {username: mail};
            deferred.resolve();
          } else {
            deferred.reject();
          }
        }, 500);
      });
      return deferred.promise;
    },
    logout: function(){
      _user = null;
      return $q.all();
    }
  };
});
