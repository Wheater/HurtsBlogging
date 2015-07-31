var app = angular.module('hurtApp');

app.controller('NewPostController'
          , ['$scope'
          , 'blogPostInsertFactory'
          , 'blogTypes'
          , function($scope, blogPostInsertFactory, blogTypes){

  $scope.blogTypes = blogTypes.data;

  $scope.submit = function(post){

    $scope.post.userId = 3;

    //add error handling...don't unload the form if
    //there was an error
    blogPostInsertFactory.insertBlogPost($scope.post);

    $scope.post = null;
    //on success/error, load red/green
    $scope.postForm.$setPristine();
    $scope.postForm.$setUntouched();
  }

}]);