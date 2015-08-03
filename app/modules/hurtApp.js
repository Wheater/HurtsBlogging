var app = angular.module('hurtApp', 
                        ['ngRoute'
                       , 'ngMessages'
                       , 'textAngular']);

app.config(['$routeProvider', '$logProvider',
  function($routeProvider, $logProvider) {
    $routeProvider.
      when('/views/about', {
        templateUrl: 'viewAbout/about.html',
        controller: 'AboutController'
      }).
      when('/views/home', {
        templateUrl: 'viewHome/home.html',
        controller: 'HomeController'
      }).
      when('/views/login', {
        templateUrl: 'viewLogin/login.html',
        controller: 'LoginController'
      }).
      when('/views/software', {
        templateUrl: 'viewSoftware/software.html',
        controller: 'BlogListController',
        resolve: {
          data: function(blogPostFactory){
            return blogPostFactory.getBlogPostsByType('Software');
          }
        }
      }).
      when('/views/family', {
        templateUrl: 'viewFamily/family.html',
        controller: 'BlogListController',
        resolve: {
          data: function(blogPostFactory){
            return blogPostFactory.getBlogPostsByType('Family');
          }
        }
      }).
      when('/views/newPost', {
        templateUrl: 'viewNewPost/newPost.html',
        controller: 'NewPostController',
        resolve: {
          blogTypes: function(blogTypesFactory){
            return blogTypesFactory.getBlogTypes();
          },
          blogList: function(blogsByUserFactory){
            return blogsByUserFactory.getBlogPostsByUser();
          }
        }
      }).
      otherwise({
        redirectTo: '/views/home'
      });
  }]);

app.controller('IndexController', function($scope){
  $scope.message = "Hello World!";
});

