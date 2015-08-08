describe('app: authModule', function(){

  beforeEach(module('authModule'));

  describe('factory: authFactory', function(){
    var factory = null;
    var httpBackend;
		var $window;
		var session;

    beforeEach(inject(function($http, $httpBackend, authFactory, _session_, _$window_){
      httpBackend = $httpBackend;
      httpBackend.when("POST", "/api/auth/verifyUser", {idToken: 'idToken'})
        .respond({authenticated: true});
      factory = authFactory;
			session = _session_;
			$window = _$window_;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('respond with success from the server', function () {
      httpBackend 
        .expectPOST('/api/auth/verifyUser', {
          idToken: 'idToken'
        })
        .respond({authenticated:true});

      var returnedPromise = factory.verifyUser({idToken: 'idToken'});   

      var result;
      
      returnedPromise.then(function(response){
        result = response;
      });

      httpBackend.flush();

      expect(result.authenticated).toBe(true);
    });

    it('respond with error from the server', function () {

      httpBackend 
        .expectPOST('/api/auth/verifyUser', {
          idToken: 'idToken'
        })
        .respond(404, '');

      var returnedPromise = factory.verifyUser({idToken: 'idToken'});   
      var result;

      returnedPromise.then(function(response){
        result = response;
      });

      httpBackend.flush();

      expect(result.err).toBe('Error authenticating. Please try logging in again.');
    });
		
		/**
		 *	Logout tests
		 */
		it('respond with success from the server', function () {
      httpBackend 
        .expectPOST('/api/auth/logout', {
          idToken: 'idToken'
        })
        .respond(200, '');
				
      var returnedPromise = factory.logout({idToken: 'idToken'});   

      var result;
      
      returnedPromise.then(function(response){
        result = response;
      });
			console.log(result);
      httpBackend.flush();

      expect(result.status).toBe(200);
    });
		it('respond with error from the server', function () {
      httpBackend 
        .expectPOST('/api/auth/logout', {
          idToken: 'idToken'
        })
        .respond(404, '');
				
      var returnedPromise = factory.logout({idToken: 'idToken'});   

      var result;
      
      returnedPromise.then(function(response){
        result = response;
      });
			console.log(result);
      httpBackend.flush();

      expect(result.err).toBe('Error logging out user in database.');
    });
  });
});