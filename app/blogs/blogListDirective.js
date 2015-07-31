var app = angular.module('hurtApp');

app.directive('blogList', function() {
  return {
    
    restrict: 'EA',
    scope: {
      type: '=',
    },
    templateUrl: '../templates/blogPosts.html',
  }
})