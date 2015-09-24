var app = angular.module('hurtApp');

app.controller('NewPostController'
          , ['$scope'
          , '$rootScope'
					, '$window'
					, '$location'
          , 'blogPostInsertFactory'
          , 'blogPostFactory'
          , 'blogTypes'
          , 'blogList'
          , 'statusList'
					, 'authFactory'
          , function($scope, $rootScope, $window, $location, blogPostInsertFactory
                    , blogPostFactory, blogTypes, blogList, statusList, authFactory){

	//check if user is logged in
	if ($rootScope.loggedIn == false) {
		$location.path("views/login");
	}				

  var redirectId = 0;
  var redirectSubject = '';

  $scope.blogTypes = blogTypes.data;
  $scope.blogList = blogList.data;
  $scope.statusList = statusList.data;
  //new vs. update
  //bool for showing error on submit
  $scope.errorMessage = false;
  $scope.successMessage = false;
  //
  $scope.formerPost = '';
  $scope.formerPost.ID = 2;

  $scope.formerPost.Body = 'Enter content here...';

  //add blank entry option
  $("#selFormer").prepend("<option value=''>Create a new post!</option>");

  $scope.selectedIndexChanged = function(){

    $scope.errorMessage = false;
    $scope.successMessage = false;

    if($('#selFormer option:selected').index() != 0){
      $scope.postForm.subject.$setValidity('required', true);
      $('#btnDelete').removeClass("disabled");
    } else{
      $scope.postForm.subject.$setValidity('required', false);
      $('#btnDelete').addClass("disabled");
    }
  }

  $scope.hideModal = function(){
    $('#draftModal').modal('hide');
    $('#deleteModal').modal('hide');
  }

  $scope.seeNewPost = function(){
    $('#postModal').modal('hide');
    $('#draftModal').modal('hide');
    $('#deleteModal').modal('hide');
    $location.path("views/singlePost/" + 
                    redirectId + 
                    '/' + 
                    redirectSubject);
  }

  $scope.$on('$locationChangeStart', function(event) {
    if($scope.postForm.$dirty && $scope.postForm.$touched){
      var answer = confirm("Are you sure you want to leave this page?")
      if (!answer) {
          event.preventDefault();
      }
    }
  });

  $scope.delete = function(id){
    blogPostFactory.deleteBlogPostById(id).
      success(function(data, status, headers, config){
        if(data.result){
          $scope.deleteErrorMessage = false;
          $scope.deleteSuccessMessage = true; 
          $('#deleteModal').modal('toggle');
          $scope.postForm.$setPristine();
          $scope.postForm.$setUntouched();
          $scope.formerPost = null;
          $scope.digest();
        } else if(data.err){
          $scope.deleteErrorMessage = true;
          $scope.deleteSuccessMessage = false;
        }
      }).
      error(function(data, status, headers, config){
        $scope.deleteErrorMessage = true;
        $scope.deleteSuccessMessage = false;
      });
  }

  $scope.submit = function(post){
    //$scope.post.userId = 3;
    //add error handling...don't unload the form if
    //there was an error
    if($('#selFormer option:selected').index() == 0){
      blogPostInsertFactory.insertBlogPost({
        subject: $scope.formerPost.Subject,
        body: makeImagesResponsive($scope.formerPost.Body),
        blogId: $scope.formerPost.blogtypeid,
        userId: $window.sessionStorage.currentUserID,
        postStatusId: $scope.formerPost.PostStatusID,
        //idToken used to verify user before allowing post
        idToken: $rootScope.googleUser.getBasicProfile().getId()
      });
      setRedirectValues();
      $scope.formerPost = null;
      $scope.postForm.$setPristine();
      $scope.postForm.$setUntouched();
      $scope.errorMessage = false;
      $scope.successMessage = true;
      $scope.digest();
      $('#postModal').modal('toggle');
    } else {
        blogPostInsertFactory.updateBlogPost({
          subject: $scope.formerPost.Subject,
          body: makeImagesResponsive($scope.formerPost.Body),
          blogId: $scope.formerPost.blogid,
          blogTypeId: $scope.formerPost.blogtypeid,
          postStatusId: $scope.formerPost.PostStatusID,
          //userId used to verify user before allowing post
          userId: $rootScope.googleUser.getBasicProfile().getId()
        })
        .then(function(response){
          //on success/error, load red/green
          if(response.err){
            $scope.errorMessage = true;
            $scope.successMessage = false;
            return;
          }
          if($scope.formerPost.PostStatusID === 3){
            $('#postModal').modal('toggle');
          } else {
            $('#draftModal').modal('toggle');
          }
          setRedirectValues();
          $scope.formerPost = null;
          $scope.postForm.$setPristine();
          $scope.postForm.$setUntouched();
          $scope.errorMessage = false;
          $scope.successMessage = true;
        })
        .catch(function(response){
          $scope.errorMessage = true;
          $scope.successMessage = false;
          return;
        });
    }
  }

  function setRedirectValues(){
    redirectId = $scope.formerPost.blogid;
    redirectSubject = $scope.formerPost.Subject;
  }

  function makeImagesResponsive(body){

    var stack = '';
    var iterations = 0;
    for (var i = 0; i < body.length; i++){
      //starting index is stack.length - 5
      if (stack.substr(stack.length - 5 + iterations*23) 
                    == "<img "){
        stack = stack + "class=\"img-responsive\" ";
      }
      stack = stack + body.charAt(i);
    }

    return stack;
  }

}]);