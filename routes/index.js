var express = require('express');
var router = express.Router();
var blogPosts = require('../models/blogPosts');
var blogTypes = require('../models/blogTypes');


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
            ];

    console.log(data);

    blogPosts.insertPost(data, function(err, result){

      if(err){
        console.log("Error inserting post: " + err);
        return err;
      }
      //MUST SEND A RESPONSE
      console.log('Success inserting post');
      return res.send(result);

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