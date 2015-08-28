var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
//var users = require('../models/users');

/* GET home page. */
router.get('/api/addSitemapEntry/:type/:id', function(req, res, next) {
  
  var type = req.params.type;
  var id = req.params.id;  

  fs.readFile('', function(err, data){
  	if (err){
  	  console.log(err);
  	  return err;
  	}

  	var index = data.indexOf("<\\urlset>");
  	var newData = data.splice(0, index) + getUrlEntry(type, id) + data.splice(index);

  	fs.writeFile('/app/sitemap.xml', newData, function (err) {
	  if (err) 
	  	console.log(err);
	  console.log('It\'s saved!');
	});
  });

  function getFormattedDate(){
  	var today = new Date();
  	var dateString = today.getFullYear() + '-' + 
	  				   today.getMonth() + 1 + '-' + 
	  				   today.getDate() + '-' +
	  				   'T' + getHours() + ':' +
	  				   today.getMinutes() + ':' + 
	  				   today.getSeconds() + '+00:00';
	console.log(dateString);
    return dateString;
  }

  function getUrlEntry(type, id){
  	var baseUrl = 'http://hurtsblogging.com';

  	if(type == 'singlePost'){
  		var fullUrl = baseUrl + '/views/singlePost/' + id;
  	}

  	var newEntry = '<url><loc>' + fullUrl + '<\\loc><lastmod>' + getFormattedDate() + '<\\lastmod><\\url>'
  	console.log(newEntry);
  	return newEntry;
  }

});
