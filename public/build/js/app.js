var app = angular.module('app', ['ngRoute', 'angular-oauth2', 'app.controllers', 'app.services']);


angular.module('app.controllers', ['ngMessages','angular-oauth2']);
angular.module('app.services', ['ngResource']);

app.provider('appConfig', function(){
    var config = {
    baseUrl: 'http://localhost:8000'
    };

     return {
        config: config,
        $get: function () {
            return config;
        }
    }

});

app.config(['$routeProvider', '$httpProvider', 'OAuthProvider', 
    'OAuthTokenProvider', 'appConfigProvider', 
    function ($routeProvider, $httpProvider, OAuthProvider, 
        OAuthTokenProvider, appConfigProvider) {
        $httpProvider.defaults.transformResponse = function (data,headers) {
                var headersGetter = headers();
                if(headersGetter['content-type'] == 'application/json' ||
                headersGetter['content-type'] == 'text/json')  {
                var dataJson = JSON.parse(data);
                if(dataJson.hasOwnProperty('data')) {
                        dataJson = dataJson.data;
                }
                return dataJson;    
            }
            return data;
        };

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
            .when('/clients/new', {
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
            })
            
            .when('/project/:id/notes', {
                templateUrl: 'build/views/project-note/list.html',
                controller: 'ProjectNoteListController',
                title: 'Projetos'
            })
            .when('/project/:id/note/:idNote/show', {
                templateUrl: 'build/views/project-note/show.html',
                controller: 'ProjectNoteShowController',
                title: 'Projetos'
            })
            .when('/project/:id/note/new', {
                templateUrl: 'build/views/project-note/new.html',
                controller: 'ProjectNoteNewController',
                title: 'Projetos'
            })
            .when('/project/:id/note/:idNote/edit', {
                templateUrl: 'build/views/project-note/edit.html',
                controller: 'ProjectNoteEditController',
                title: 'Projetos'
            })
            .when('/project/:id/note/:idNote/remove', {
                templateUrl: 'build/views/project-note/remove.html',
                controller: 'ProjectNoteRemoveController',
                title: 'Projetos'
            });



            OAuthProvider.configure({
              baseUrl: appConfigProvider.config.baseUrl,
              clientId: 'appid1',
              clientSecret: 'secret', // optional
              grantPath: 'oauth/accees_token'
            });

            OAuthTokenProvider.configure({
            name: 'token',
            options: {
                secure: false
            }
            })

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