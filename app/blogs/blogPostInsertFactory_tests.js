describe('app: hurtApp', function(){

  beforeEach(module('hurtApp'));

  describe('factory: blogPostInsertFactory', function(){
    var factory = null;
    var httpBackend;

    beforeEach(inject(function($http, $httpBackend, blogPostInsertFactory){
      httpBackend = $httpBackend;
      factory = blogPostInsertFactory;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('respond with success from the server', function () {
      httpBackend 
        .expectPOST('/api/v1/updateBlogPost', {
          id: 1,
          subject: 'Test subject',
          body: 'Test body'
        })
        .respond(200, 'Post updated');

      var returnedPromise = factory.updateBlogPost({
        id: 1,
        subject: 'Test subject',
        body: 'Test body'
      });   

      var result;
      
      returnedPromise.then(function(response){
        result = response;
      });

      httpBackend.flush();

      expect(result.status).toBe(200);
      expect(result.data).toBe('Post updated');
    });
  });
});