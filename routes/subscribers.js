var express = require('express');
var router = express.Router();
var subscribers = require('../models/subscribers')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/api/v1/addSubscriber', function(req, res, next) {

  var email = req.body.email;
  var blogId = req.body.blogId;

  var results = subscribers.addSubscriber(email,
                                          blogId,
                                  function(results){
    console.log(results);
    return res.json(results);
  });
});

router.post('/api/v1/removeSubscriber', function(req, res, next) {

  var email = req.body.email;

  var results = subscribers.removeSubscriber(email,
                                  function(results){
    console.log(results);
    return res.json(results);
  });
});

module.exports = router;