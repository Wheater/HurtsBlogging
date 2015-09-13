var app = angular.module('SubscriberMod', []);

app.factory('subscriberFactory', ['$http', function($http) {
  return {
      addSubscriber: function(email, blogId) {
        var promise = $http.post('/api/v1/addSubscriber', 
                                  {email: email
                                 , blogId: blogId}).
          success(function(data, status, headers, config) {
            return data;
          }).
          error(function(data, status, headers, config) {
            return {
              'response': 'Error adding subscription, please try again later'
            };
          });

          return promise;
        },
        removeSubscriber: function(email) {
        var promise = $http.post('/api/v1/removeSubscriber', 
                                  {email: email}).
          success(function(data, status, headers, config) {
            return data;
          }).
          error(function(data, status, headers, config) {
            return {
              'response': 'Error removing subscription, please try again later'
            };
          });

          return promise;
        }
      }
  }]);

app.directive('subscribe', ['$location', 'subscriberFactory', function($location, subscriberFactory) {
  return {
    
    restrict: 'E',
    scope: {
      type: '@'
    },

    controller: function($scope, $attrs, $location){
      
    },
    link: function(scope, element, attributes){
      scope.buttonClick = function(email){
        //email validation should be done prior to this function
        //within the html code
        scope.success = false;
        scope.error = false;
        //submit http request here
        var blogId = $location.path().split("/").pop();

        var result = subscriberFactory.addSubscriber(email, blogId)
                                      .success(function(){
                                        scope.success = true;
                                        scope.error = false;
                                      })
                                      .error(function(){
                                        scope.error = true;
                                        scope.success = false;
                                      });
      }
    },
    templateUrl: '../templates/subscriberTemplate.html'
  }
}]);