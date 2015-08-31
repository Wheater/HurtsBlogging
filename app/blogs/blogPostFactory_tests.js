describe('app: hurtApp', function(){

  beforeEach(module('hurtApp'));

  describe('factory: blogPostFactory', function(){
    var factory = null;
    var httpBackend;

    beforeEach(inject(function($http, $httpBackend, blogPostFactory){
      httpBackend = $httpBackend;
			console.log(httpBackend);
      factory = blogPostFactory;
    }));

    afterEach(function() {
      httpBackend.verifyNoOutstandingExpectation();
      httpBackend.verifyNoOutstandingRequest();
    });

    it('passes on data when successful', function () {
      httpBackend 
        .expectPOST('/api/v1/getBlogPostsByType', {type:'family'})
        .respond({ 
					data: []});

      var returnedPromise = factory.getBlogPostsByType('family');   

      var result;
      
      returnedPromise.then(function(data){
				console.log(data);
        result = data;
      });
			console.log(result);
      httpBackend.flush();

      expect(result.data.data).toBe([]);
    });

    it('returns a fun response when there is an error', function () {

      httpBackend 
        .expectPOST('/api/v1/getBlogPostsByType', {type:'family'})
        .respond(404, '');
      var returnedPromise = factory.getBlogPostsByType('family');   
      var result;
      returnedPromise.then(function(response){
        result = response;
      });
      httpBackend.flush();
			console.log(result);
      expect(result.subject).toBe('Sorry!');
    });
  });
});