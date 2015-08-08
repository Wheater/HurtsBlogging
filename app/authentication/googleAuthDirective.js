var app = angular.module('authModule');

app.directive('googleAuthDirective', function(){
  return {
    restrict: 'E',

	link: function(scope, element, attrs){
		
	},
    templateUrl: '../authentication/googleLogin.html'
  };
});