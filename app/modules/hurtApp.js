var app = angular.module('hurtApp', 
                        ['ngRoute'
                       , 'ngMessages'
                       , 'textAngular'
                       , 'angularUtils.directives.dirDisqus'
											 , 'authModule'
                       , 'SubscriberMod']);

app.config(['$routeProvider', '$locationProvider',
  function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider.
      when('/views/about', {
        templateUrl: 'viewAbout/about.html',
        controller: 'AboutController'
      }).
      when('/views/home', {
        templateUrl: 'viewHome/home.html',
        controller: 'BlogListController',
        resolve: {
          data: function(blogPostFactory){
            return blogPostFactory.getBlogPostsByType('All');
          },
          preview: function(){
            return true;
          }
        }
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
          }, 
          preview: function(){
            return true;
          }
        }
      }).
      when('/views/family', {
        templateUrl: 'viewFamily/family.html',
        controller: 'BlogListController',
        resolve: {
          data: function(blogPostFactory){
            return blogPostFactory.getBlogPostsByType('Family');
          },
          preview: function(){
            return true;
          }
        }
      }).
      when('/views/singlePost/:id/:subject', {
        templateUrl: 'viewSinglePost/singlePost.html',
        controller: 'BlogListController',
        resolve: {
          data: function($route, blogPostFactory){
            return blogPostFactory.getPostById($route.current.params.id);
          },
          preview: function(){
            return false;
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
          },
          statusList: function(postStatusFactory){
            return postStatusFactory.getPostStatuses();
          }
        }
      }).
      when('/sitemap.xml', {
        templateUrl: 'sitemap.xml'
      }).
      otherwise({
        redirectTo: '/views/home'
      });
  }]);
	
	app.run(function($rootScope, $window){
		$rootScope.loggedIn = false;		
	})

app.controller('IndexController', function($scope){
  $scope.message = "Hello World!";
});

