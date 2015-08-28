describe('app: hurtApp', function(){

  beforeEach(module('hurtApp'));

  describe('factory: blogsByUserFactory', function(){
    var factory = null;
    var httpBackend;

    beforeEach(inject(function($http, $httpBackend, blogsByUserFactory){
      httpBackend = $httpBackend;
      factory = blogsByUserFactory;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('respond with success from the server', function () {
      httpBackend 
        .expectPOST('/api/v1/getBlogPostsByUser', {
          userId: 3
        })
        .respond(200, '');

      var returnedPromise = factory.getBlogPostsByUser({
      });   

      var result;
      
      returnedPromise.then(function(response){
        result = response;
      });

      httpBackend.flush();

      expect(result.status).toBe(200);
      expect(result.data).toBe('');
    });
  });
});