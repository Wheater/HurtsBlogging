var app = angular.module('hurtApp');

app.factory('blogTypesFactory', ['$http', function($http) {
  return {
      getBlogTypes: function() {

        var promise = $http.get('/api/v1/getBlogTypes').
          success(function(data, status, headers, config) {
            return data;
          }).
          error(function(data, status, headers, config) {
            return "Error";
          });

          return promise;
        }
      }
  }]);