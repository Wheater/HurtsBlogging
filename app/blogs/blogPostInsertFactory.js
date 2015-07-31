var app = angular.module('hurtApp');

app.factory('blogPostInsertFactory', ['$http', '$filter', function($http, $filter) {
  return {
      insertBlogPost: function(post) {

        var today = $filter('date')(new Date(),'short');


        post.postDate = today;
        post.blogId = post.blogId.ID;

        $http.post('/api/v1/insertBlogPost', post).
        success(function(data, status, headers, config) {
          return data;
        }).
        error(function(data, status, headers, config) {
            console.log("Error inserting post: " + data);
            return 'Error inserting post. Please try again.';
        });

        }
      }
  }]);