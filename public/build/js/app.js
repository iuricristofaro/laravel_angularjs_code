var app = angular.module('app',['ngRoute', 'angular-oauth2', 'app.controllers']);

angular.module('app.controllers', ['angular-oauth2']);

app.config(function($routeProvider){
    $routeProvider
        .when('/login',{
            templateUrl: 'build/views/login.html',
            controller: 'LoginController'
        })

        .when('/home', {
                templateUrl: 'build/views/home.html',
                controller: 'HomeController'
        })
});

