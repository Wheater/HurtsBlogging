var app = angular.module('hurtApp');

app.controller('BlogListController', ['$scope', '$sce', 'blogPostFactory', 'data', function($scope, $sce, blogPostFactory, data){
  
  $scope.familyPosts = data.data;
  $scope.familyPosts.Body = $sce.trustAsHtml(data.data.Body);
  $scope.softwarePosts = data.data;
  $scope.softwarePosts.Body = $sce.trustAsHtml(data.data.Body);
}]);
