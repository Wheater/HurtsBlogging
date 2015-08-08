var app = angular.module('hurtApp');

app.factory('blogPostFactory', ['$http', function($http) {
  return {
      getBlogPostsByType: function(type) {
        var promise = $http.post('/api/v1/getBlogPostsByType', {type: type}).
          success(function(data, status, headers, config) {
            return data;
          }).
          error(function(data, status, headers, config) {
            return {
              'subject': 'Sorry!',
              'body': 'Looks like the Hurts are asleep and couldn\'t retrieve the post.'
            };
          });

          return promise;
        },
        getPostById: function(id) {
          var promise = $http({
            url: '/api/v1/getPostById',
            method: "GET",
            params: {id: id}
          }).
          success(function(data, status, headers, config) {
            return data;
          }).
          error(function(data, status, headers, config) {
            return {
              'subject': 'Sorry!',
              'body': 'Looks like the Hurts are asleep and couldn\'t retrieve the post.'
            };
          });

          return promise;
        }
      }
  }]);