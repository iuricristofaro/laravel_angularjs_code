var app = angular.module('app', ['ngRoute', 'angular-oauth2', 'app.controllers']);


angular.module('app.controllers', ['ngMessages','angular-oauth2']);
angular.module('app.services', ['ngResource']);

app.provider('appConfig', function(){
	var config = {
	baseUrl: 'http://localhost:8000'
	};

	return {
		config: config,
		$get: function(){
			return config;
		}
	}

});

app.config(['$routeProvider', 'OAuthProvider', 'appConfigProvider', 
	function ($routeProvider, OAuthProvider, appConfigProvider) {
        $routeProvider
            .when('/login', {
                templateUrl: 'build/views/login.html',
                controller: 'LoginController'
            })
            .when('/home', {
                templateUrl: 'build/views/home.html',
                controller: 'HomeController',
                title: 'Home'
            })
             .when('/clients', {
                templateUrl: 'build/views/client/list.html',
                controller: 'ClientListController',
                title: 'Clientes'
			})
             .when('/clients/dashboard', {
                templateUrl: 'build/views/client/dashboard.html',
                controller: 'ClientDashboardController',
                title: 'Clientes'
            })
            .when('/client/new', {
                templateUrl: 'build/views/client/new.html',
                controller: 'ClientNewController',
                title: 'Clientes'
            })
            .when('/client/:id/edit', {
                templateUrl: 'build/views/client/edit.html',
                controller: 'ClientEditController',
                title: 'Clientes'
            })
            .when('/client/:id/remove', {
                templateUrl: 'build/views/client/remove.html',
                controller: 'ClientRemoveController',
                title: 'Clientes'
			});
            OAuthProvider.configure({
		      baseUrl: appConfigProvider.config.baseUrl,
		      clientId: 'app',
		      clientSecret: 'secret', // optional
		      grantPath: 'oauth/accees_token'
		    });

}]);


app.run(['$rootScope', '$window', 'OAuth', function($rootScope, $window, OAuth) {
    $rootScope.$on('oauth:error', function(event, rejection) {
      // Ignore `invalid_grant` error - should be catched on `LoginController`.
      if ('invalid_grant' === rejection.data.error) {
        return;
      }

      // Refresh token when a `invalid_token` error occurs.
      if ('invalid_token' === rejection.data.error) {
        return OAuth.getRefreshToken();
      }

      // Redirect to `/login` with the `error_reason`.
      return $window.location.href = '/login?error_reason=' + rejection.data.error;
    });
  }]);