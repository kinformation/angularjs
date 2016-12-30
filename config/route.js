app.config(function($routeProvider){
  var requireAuth = {
    login: function($q, $location, AuthService){
      if (AuthService.isLogged() == false)
      {
        $location.path('/login');
        return $q.reject();
      }
    }
  };

  $routeProvider.when('/', {
    template: '<h1>home</h1>',
    controller: function(){},
    resolve: requireAuth
  });
  $routeProvider.when('/page1', {
    template: '<h1>page1</h1>',
    controller: function(){},
    resolve: requireAuth
  });
  $routeProvider.when('/page2', {
    templateUrl: 'view/crud.html',
    controller: function(){},
    resolve: requireAuth
  });
  $routeProvider.when('/login', {
    templateUrl: 'view/login.html',
    controller: 'LoginCtrl'
  });
  $routeProvider.when('/regist', {
    templateUrl: 'view/regist.html',
    controller: 'RegistCtrl'
  });
  $routeProvider.when('/registComplete', {
    template: '<h1>OK</h1><!--script>setTimeout("redirect()", 5);function redirect(){location.href="index.html";}</script-->',
    controller: function(){},
  });
  $routeProvider.otherwise({
    redirectTo: '/'
  });
});
