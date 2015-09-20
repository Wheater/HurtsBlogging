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
          $location.path('/views/singlePost/' + post.blogid + '/' + replaceWhiteSpace(post.Subject));
        }
      }

      function replaceWhiteSpace(input){
        return input.replace(/\s/g, "-");
      }
    },
    templateUrl: '../templates/blogPosts.html'
  }
})
