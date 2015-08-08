var app = angular.module('authModule');

app.factory('authFactory', ['$http', '$window', '$location', function($http, $window, $location){
	
	
  return {

    verifyUser: function(idToken){
      
      var promise = $http({
          url: '/api/v1/verifyUser',
          method: "GET",
          params: {idToken: idToken}
        }).
        then(function(response){
          //returns true/false depending on valid/invalid user
          //returns isAdmin
          return response;
        }).
        catch(function(response){
          
          console.log("Data: " + response.data + "\n\n" 
                    + "Status: " + response.status);
          
          return { 
              err: 'Error authenticating. Please try logging in again.'
            };
        });

      return promise;
    },
    logout: function(idToken){
			var promise = $http.post('/api/auth/logout', idToken).
				then(function(response){
					return response;
				}).
				catch(function(response){
					console.log("Error logging out user.");
					
					return {
						err: 'Error logging out user in database.'
					}
				});
				
			return promise;
    }   
  }
}]);