var app = angular.module('hurtApp');

app.directive('twitterButton', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/twitterButton.html'
  }
})
