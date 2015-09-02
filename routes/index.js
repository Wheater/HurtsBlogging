var express = require('express');
var router = express.Router();
var blogPosts = require('../models/blogPosts');
var blogTypes = require('../models/blogTypes');
var users = require('../models/users');
var sitmeap = require('../models/sitemap');
var rss = require('../models/rss');
var http = require('http');
//var users = require('../models/users');


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hurt Family Blogging Site' });
});

/* GET blog types */
router.get('/api/v1/getBlogTypes', function(req, res){
  var results = blogTypes.getBlogTypes(function(results){
    console.log(results);
    return res.json(results);
  })
});

/* GET blog types */
router.get('/api/v1/getPostById', function(req, res){
  var results = blogPosts.getPostById(req.query.id, function(results){
    console.log(results);
    return res.json(results);
  })
});

router.get('/api/v1/getPostStatuses', function(req, res){
  var results = blogTypes.getPostStatuses(function(results){
    console.log(results);
    return res.json(results);
  })
});

router.post('/api/v1/getBlogPostsByUser', function(req, res){
  console.log(req.body.userId);
  var results = blogPosts.getPostsByUser(req.body.userId, function(results){
    console.log(results);
    return res.json(results);
  })
});

//Get blog posts
router.get('/api/v1/getBlogPosts', function(req, res) {

    var results = blogPosts.getPostFeed(5, function(results){
      console.log(results);
      return res.json(results);
    })
    //var data = {count: req.body.count}
});

//Insert blog post
router.post('/api/v1/insertBlogPost', function(req, res) {

  // Grab data from http request
  // data MUST be sent as JSON from Angular
  var data = [req.body.subject
            , req.body.body
            , req.body.blogId
            , req.body.userId
            , req.body.postDate
            , req.body.postStatusId
          ];

  var currentUser = req.body.idToken;

  //verify user before allowing post
  var results = users.verifyUser([currentUser],
                                  function(results){
    console.log(results);
    if(results.length == 0){
      return res.send({
        err: 'user not authenticated'
      });
    } //post if user is authenticated 
    else {
      blogPosts.insertPost(data, function(err, result){

        if(err){
          console.log("Error inserting post: " + err);
          return err;
        }

        /* -----RSS AND SITEMAP HANDLING ----- */
        //add sitemap entry
        sitemap.addToSitemap('singlePost', 10); //change to id later--------------------------
        //add rss entry
        rss.addRssEntry({
          'subject': req.body.subject,
          'body': req.body.body,
          'id': 10 //change to id later-------------------
        });

        //MUST SEND A RESPONSE
        console.log('Success inserting post');
        return res.send(result);

      });
    }      
  });
});

router.post('/api/v1/updateBlogPost', function(req, res) {

    // Grab data from http request
    // data MUST be sent as JSON from Angular
    var data = [req.body.subject
              , req.body.body
              , req.body.blogId
              , req.body.blogTypeId
              , req.body.postStatusId
            ];

    var currentUser = req.body.userId;

    //verify user before allowing post
    var results = users.verifyUser([currentUser],
                                    function(results){
      console.log(results);
      if(results.length == 0){
        return res.send({
          err: 'user not authenticated'
        });
      } //post if user is authenticated 
      else {
        for(var i = 0; i < data.length; i++){
          if (data[i] === undefined){
            console.log('errored out');
            return res.send({
              err: 'no undefined parameters allowed'
            });
          }
        }

        console.log('about to update');

        blogPosts.updatePost(data, function(err, result){

          if(err){
            console.log("Error updating post: " + err);
            return err;
          }
          //MUST SEND A RESPONSE
          console.log('Success updating post');
          return res.send(result);

        });
      }
    });
    
  
    
});

//Get blog posts
router.post('/api/v1/getBlogPostsByType', function(req, res) {

    var type = req.body.type;

    var results = blogPosts.getPostsByType(type, function(results){
      console.log(results);
      return res.json(results);
    })
    //var data = {count: req.body.count}
});


module.exports = router;