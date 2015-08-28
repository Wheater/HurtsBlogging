var express = require('express');
var router = express.Router();
var http = require('http');
var fs = require('fs');
var exports = module.exports = {};
//var users = require('../models/users');

//add sitemap entry when new blogPost (or some future pages) are created
router.get('/api/addSitemapEntry/:type/:id', function(req, res, next) {
  
  var type = req.params.type;
  var id = req.params.id;  

  //read in current file first
  fs.readFile('', function(err, data){
  	if (err){
  	  console.log(err);
  	  return err;
  	}
  	
    //write out full new file
	  fs.writeFile('/app/sitemap.xml'
               , getNewFileData(type, id, data, new Date())
               , function (err) {
  	  if (err) 
  	  	console.log(err);
  	  console.log('It\'s saved!');
	  });
  });

});

function getLastMod(date){
  //date look like: 2015-08-10-T03:35:15+00:00
  //format new date to match url file requirements
  var dateString = date.getFullYear() + '-' + 
             (date.getMonth()+1) + '-' + 
             date.getDate() + '-' +
             'T' + date.getHours() + ':' +
             date.getMinutes() + ':' + 
             date.getSeconds() + '+00:00';
  return '<lastmod>' + dateString + '</lastmod>';
}
//form url from type and id
function getLoc(type, id){
  var baseUrl = 'http://hurtsblogging.com';

  if(type == 'singlePost'){
    var fullUrl = baseUrl + '/views/singlePost/' + id;
  }

  return '<loc>' + fullUrl + '</loc>';
}

function getNewFileData(type, id, currentFileData, date){

  var newData = '';

  if(type == 'singlePost'){

    var index = currentFileData.indexOf("</urlset>");

    newData = currentFileData.slice(0, index) + 
                  '<url>' + 
                  getLoc(type, id) + 
                  getLastMod(date) + 
                  '</url>' + 
                  currentFileData.slice(index);
  }

  return newData;
}

exports.getLastMod = getLastMod;
exports.getLoc = getLoc;
exports.getNewFileData = getNewFileData;