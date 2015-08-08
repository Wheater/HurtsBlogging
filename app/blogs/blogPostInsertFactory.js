var app = angular.module('hurtApp');

app.factory('blogPostInsertFactory', ['$http', '$filter', function($http, $filter) {
  return {
      insertBlogPost: function(post) {

          var today = $filter('date')(new Date(),'short');

          post.postDate = today;

          $http.post('/api/v1/insertBlogPost', post).
          success(function(data, status, headers, config) {
            return data;
          }).
          error(function(data, status, headers, config) {
              console.log("Error inserting post: " + data);
              return 'Error inserting post. Please try again.';
          });

        },

      updateBlogPost: function(post) {
        
          var promise = $http.post('/api/v1/updateBlogPost', post).
            then(function(response) {

              $.each(post, function(key, value) {
                  if(value === undefined){
                    response.err = 'no undefined values accepted';
                    return response;
                  }
              });

              response.data = 'Post updated';

              return response;
            }).
            catch(function(response) {
              return 'Error';
          });

          return promise;
        }
      }
  }]);