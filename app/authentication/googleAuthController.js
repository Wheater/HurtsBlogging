var app = angular.module('authModule');

app.controller('googleAuthController', 
              ['$scope'
             , '$rootScope'
             , '$window'
             , 'authFactory'
             , function ($scope, $rootScope ,$window, authFactory) {
  
		$scope.onSignIn = function(googleUser){	

      $rootScope.googleUser = googleUser;

			authFactory.verifyUser(googleUser.getBasicProfile().getId()).
				then(function(response){
          if(response.data.length > 0){
  					$window.sessionStorage.currentUserID = response.data[0].ID;
            $rootScope.loggedIn = true;
          }
				}).
				catch(function(response){
					$rootScope.currentUser = null;
				});
		}
    $scope.signOut = function() {
			var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        $rootScope.googleUser = null;
				$rootScope.loggedIn = false;
        $window.sessionStorage.currentUserID = null;
				$rootScope.$digest();
      });
    }
		
		$scope.message = 'Sign out';
	//$scope.authFactory.logout(idToken);
  }]);