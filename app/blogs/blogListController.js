var app = angular.module('hurtApp');

app.controller('BlogListController', ['$scope', 'blogPostFactory', 'data', function($scope, blogPostFactory, data){
  
  $scope.familyPosts = data.data;

  $scope.softwarePosts = data.data;
}]);
