var app = angular.module('hurtApp');

app.factory('postStatusFactory', ['$http', function($http) {
  return {
      getPostStatuses: function() {

        var promise = $http.get('/api/v1/getPostStatuses').
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