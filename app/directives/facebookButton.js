var app = angular.module('hurtApp');

app.directive('facebookButton', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/facebookButton.html'
  }
})
