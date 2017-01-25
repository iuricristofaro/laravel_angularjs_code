angular.module('app.controllers')
    .controller('LoginController', ['$scope', '$localtion', 'OAuth', function($scope,$localtion,OAuth){
        $scope.user = {
            username:  '',
            password:  ''
        };

        $scope.login = function() {
            OAuth.getAccessToken($scope.user).then(function(){
                $localtion.path('home');
            },function(){
                alert('Login Inálido');
            });
        };

    }]);