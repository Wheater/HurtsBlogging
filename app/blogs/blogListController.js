var app = angular.module('hurtApp');

app.controller('BlogListController'
              , ['$scope'
              , '$location'
              , '$sce'
              , '$filter'
              , 'blogPostFactory'
              , 'data'
              , 'preview'
              , function($scope
                       , $location
                       , $sce
                       , $filter
                       , blogPostFactory
                       , data
                       , preview){
  
  var wordCount = 100;

  var noResultsPost = [{
    Subject: 'Sorry! The Hurts are napping right now...',
    Body: 'There are no posts available at this time, please check back soon!',
    PostDate: $filter('date')(new Date(),'short'),
    name: 'Eric Hurt'
  }];

  if(data.data.length == 0){
    $scope.familyPosts = noResultsPost;
    $scope.softwarePosts = noResultsPost;
    $scope.homePosts = noResultsPost;
  } else {

    if(preview == 'true'){

      var previewString = '';
      for(var j = 0; j < data.data.length; j++){
        var bodyArray = data.data[j].Body.split(' ');

        data.data[j].Body = bodyArray.slice(0, wordCount).join(' ');
      }
    } 
    $scope.familyPosts = data.data;
    $scope.familyPosts.Body = $sce.trustAsHtml(data.data.Body);
    $scope.softwarePosts = data.data;
    $scope.softwarePosts.Body = $sce.trustAsHtml(data.data.Body);
    $scope.homePosts = data.data;
    $scope.homePosts.Body = $sce.trustAsHtml(data.data.Body);
  }
}]);
