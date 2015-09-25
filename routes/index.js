var express = require('express');
var router = express.Router();
var blogPosts = require('../models/blogPosts');
var blogTypes = require('../models/blogTypes');
var users = require('../models/users');
var sitemap = require('../models/sitemap');
var rss = require('../models/rss');
var http = require('http');
var mailer = require('../models/mailer');
var subscribers = require('../models/subscribers');
var util = require('util');

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

router.post('/api/v1/deleteBlogPostById', function(req, res) {
  //update post to "deleted" 0 -> 1
  blogPosts.deletePostById(req.body.blogId, function(result){

    if(result.rowCount === 1){
      rss.removeRssEntry(req.body.blogId);
      sitemap.removeFromSitemap(req.body.blogId);
      return res.status(200).json({
        result: 'Post deleted'
      });
    } else if (result.rowCount === 0){
      return res.json({
        err: 'Trouble finding that post, could not delete it.'
      });
    }
  });
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
        blogPosts.getPostCurVal(function(result){
          var id = result;

          if(id != null && req.body.postStatusId === 3){
            sitemap.addToSitemap('singlePost', id, req.body.subject); 

            rss.addRssEntry({
              'subject': req.body.subject,
              'body': req.body.body,
              'id': id 
            });

            if(req.body.postStatusId === 3){

              subscribers.getSubscribersByBlogType(req.body.blogId, function(results){

                for(var i = 0; i < results.length; i++){
                //send email if status is Post
                setTimeout(mailer.sendEmail({
                    msg: req.body.body,
                    from: 'blog@hurtsblogging.com', 
                    to: results[i].Email.toString(),
                    subject: req.body.subject
                  }, function callback(result){
                    console.log(result);
                  }), 5000);
                }
              }); 
            }
          }

          console.log('Success inserting post');
          return res.send(result);
        });
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
    var id = req.body.blogId;

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

          //handle rss and sitemap on update 
          if(req.body.postStatusId === 3){
            sitemap.addToSitemap('singlePost', id, req.body.subject); 

            rss.addRssEntry({
              'subject': req.body.subject,
              'body': req.body.body,
              'id': id
            });

            subscribers.getSubscribersByBlogType(req.body.blogTypeId, function(results){

              for(var i = 0; i < results.length; i++){
              //send email if status is Post
              setTimeout(mailer.sendEmail({
                  msg: req.body.body,
                  from: 'blog@hurtsblogging.com', 
                  to: results[i].Email.toString(),
                  subject: req.body.subject
                }, function callback(result){
                  console.log(result);
                }), 5000);
              }
            }); 

          } else if(id != null && req.body.postStatusId !== 3){
            sitemap.removeFromSitemap(id); 
            rss.removeRssEntry(id);
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