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

    if(preview == true){

      var previewString = '';
      for(var j = 0; j < data.data.length; j++){
        var bodyArray = data.data[j].Body.split(' ');
        bodyArray = bodyArray.slice(0, wordCount);
        data.data[j].Body = bodyArray.join(' ');
      } 
    } else {
        $scope.identifier = data.data[0].blogid;
        $scope.url = 'http://www.hurtsblogging.com/views/singlePost/' + data.data[0].blogid;
      }
    $scope.familyPosts = data.data;
    $scope.familyPosts.Body = $sce.trustAsHtml(data.data.Body);
    $scope.softwarePosts = data.data;
    $scope.softwarePosts.Body = $sce.trustAsHtml(data.data.Body);
    $scope.homePosts = data.data;
    $scope.homePosts.Body = $sce.trustAsHtml(data.data.Body);
  }
}]);
