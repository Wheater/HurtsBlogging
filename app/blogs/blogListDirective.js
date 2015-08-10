var app = angular.module('hurtApp');

app.directive('blogList', function() {
  return {
    
    restrict: 'EA',
    scope: {
      type: '=',
      preview: '='
    },
    controller: function($scope, $attrs, $location){
      $scope.postClicked = function(post){
        if(post.blogid > 0){
          $location.path('/views/singlePost/' + post.blogid);
        }
      $scope.previewLink = preview;
      }
    },
    templateUrl: '../templates/blogPosts.html'
  }
})