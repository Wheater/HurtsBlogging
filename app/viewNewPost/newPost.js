var app = angular.module('hurtApp');

app.controller('NewPostController'
          , ['$scope'
          , 'blogPostInsertFactory'
          , 'blogTypes'
          , 'blogList'
          , function($scope, blogPostInsertFactory, blogTypes, blogList){

  $scope.blogTypes = blogTypes.data;
  $scope.blogList = blogList.data;
  //new vs. update
  $scope.newPost = true;
  //bool for showing error on submit
  $scope.errorMessage = false;
  //
  $scope.formerPost = '';
  $scope.formerPost.ID = 2;

  $scope.formerPost.Body = 'Enter content here...';

  //add blank entry option
  $("#selFormer").prepend("<option value=''></option>");

  $scope.selectedIndexChanged = function(){

    if($('#selFormer option:selected').index() != 0){

      $scope.postForm.subject.$setValidity('required', true);
      $scope.newPost = false;
    } else{

      $scope.newPost = true;
      $scope.postForm.subject.$setValidity('required', false);
    }
  }

  $scope.submit = function(post){
    //$scope.post.userId = 3;
    //add error handling...don't unload the form if
    //there was an error

    if($scope.newPost){
      blogPostInsertFactory.insertBlogPost({
        subject: $scope.formerPost.Subject,
        body: $scope.formerPost.Body,
        blogId: $scope.formerPost.blogtypeid,
        userId: 3
      });

      $scope.formerPost = null;
      $scope.postForm.$setPristine();
      $scope.postForm.$setUntouched();
      $scope.errorMessage = false;
    } else {
        blogPostInsertFactory.updateBlogPost({
          subject: $scope.formerPost.Subject,
          body: $scope.formerPost.Body,
          blogId: $scope.formerPost.blogid,
          blogTypeId: $scope.formerPost.blogtypeid
        })
        .then(function(response){
          //on success/error, load red/green
          if(response.err){
            $scope.errorMessage = true;
            return;
          }
          $scope.formerPost = null;
          $scope.postForm.$setPristine();
          $scope.postForm.$setUntouched();
          $scope.errorMessage = false;
        })
        .catch(function(response){
          $scope.errorMessage = true;
          return;
        });
    }
  }

}]);