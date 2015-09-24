var app = angular.module('hurtApp');

app.directive('rssButton', function() {
  return {
    restrict: 'E',
    templateUrl: '../templates/rssButton.html'
  }
})
