var app = angular.module('authModule');

app.factory('authFactory', ['$http', function($http){
  return {
    verifyUser: function(idToken){
      
      var promise = $http.post('/api/auth/verifyUser', {idToken: 'idToken'}).
        then(function(response){
          //returns true/false depending on valid/invalid user
          //returns isAdmin
          return response.data;
        }).
        catch(function(response){
          
          console.log("Data: " + response.data + "\n\n" 
                    + "Status: " + response.status);
          
          return { 
              err: 'Error authenticating. Please try logging in again.'
            };
        });

      return promise;
    }
  }
}]);