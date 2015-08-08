function onSignIn(googleUser) {

	var scope = angular.element($("#googleAuthListener")).scope();
	
	scope.onSignIn(googleUser);
}