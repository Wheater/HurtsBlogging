var app = angular.module('authModule');

app.directive('googeAuthDirective', function(){
  return {
    bindToController: 'googleAuthController',
    restrict: 'E',
    scope: {

    },
    templateUrl: 'googleLogin.html'
  }
});