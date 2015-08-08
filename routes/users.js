var express = require('express');
var router = express.Router();
var users = require('../models/users')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/api/v1/verifyUser', function(req, res, next) {
  var results = users.verifyUser([req.query.idToken],
                                  function(results){
    console.log(results);
    return res.json(results);
  })
});

module.exports = router;
