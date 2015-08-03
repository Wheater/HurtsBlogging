var app = angular.module('hurtApp');

app.factory('blogsByUserFactory', ['$http', '$filter', function($http, $filter) {
  return {
      getBlogPostsByUser: function() {

        //get userId here
        var id = 3;

          var promise = $http.post('/api/v1/getBlogPostsByUser', {userId: id}).
            then(function(response) {

              return response;
            }).
            catch(function(response) {
              console.log(response);
                console.log("Error getting posts: " + response);
                return 'Error getting posts. Please try again.';
          });

          return promise;
        }
      }
  }]);