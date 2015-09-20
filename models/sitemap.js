var fs = require('fs');
var exports = module.exports = {};
//var users = require('../models/users');
//add sitemap entry when new blogPost (or some future pages) are created
function addToSitemap(type, id, subject) {

  //read in current file first
  fs.readFile('./app/sitemap.xml', function(err, data){
  	if (err){
  	  console.log(err);
  	  return err;
  	}
  	
    //write out full new file
	  fs.writeFile('./app/sitemap.xml'
               , getNewFileData(type, id, data, new Date(), subject)
               , function (err) {
  	  if (err) 
  	  	console.log(err);
  	  console.log('It\'s saved!');
	  });
  });
}

function removeFromSitemap(id){
  //read in current file first
  fs.readFile('./app/sitemap.xml', function(err, data){
    if (err){
      console.log(err);
      return err;
    }
    console.log(data.toString());
    //write out full new file
    fs.writeFile('./app/sitemap.xml'
               , updateData(0, id, data)
               , function (err) {
      if (err) 
        console.log(err);
      console.log('It\'s removed!');
    });
  });
}

function updateData(index, id, data){
  //get index of first <url> and first </url>
  //if index of id is between, remove
  //iterate until it is found or isn't
  data = data.toString();

  var start = data.slice(index, data.length).indexOf('<url>') + index;
  var end = data.slice(index, data.length).indexOf('</url>') + index;

  //return if no url section found or if index is too high
  if(start < 0 || end < 0 || index >= data.length){
    return data;
  }

  //want to include the < when searching to be sure
  //1 does not mach 11 or 12 or 123, so if index of
  //1< is there, it means we matched 1 indentically
  var foundIndex = data.slice(start, end).indexOf('singlePost/' + id + '/');
  if(foundIndex < 0){
    return updateData(end + 6, id, data);
  } else {
    //remove url section
    var result = data.slice(0, start) + data.slice(end + 6);
    console.log('found match: ' + result);
    return result;
  }
}

function getLastMod(date){
  //date look like: 2015-08-10-T03:35:15+00:00
  //format new date to match url file requirements
  if(date == null)
    date = new Date();

  var dateString = date.getFullYear() + '-' + 
             padFront((date.getMonth()+1)) + '-' + 
             padFront(date.getDate()) +
             'T' + padFront(date.getHours()) + ':' +
             padFront(date.getMinutes()) + ':' + 
             padFront(date.getSeconds()) + '+00:00';
  return '<lastmod>' + dateString + '</lastmod>';
}
//form url from type and id
function getLoc(type, id, subject){
  var baseUrl = 'http://hurtsblogging.com';

  if(id == null || id <= 0)
    throw "no id provided";

  if(type == 'singlePost'){
    var fullUrl = baseUrl + '/views/singlePost/' + id + '/' + replaceWhiteSpace(subject);
  } else {
    throw "no type provided";
  }

  return '<loc>' + fullUrl + '</loc>';
}

function getNewFileData(type, id, currentFileData, date, subject){

  var newData = '';
  if(id == null)
    return currentFileData;
  if(date == null)
    date = new Date();
  if(currentFileData == null)
    throw "no file loaded";

  if(type == 'singlePost'){

    var index = currentFileData.toString().indexOf("</urlset>");

    newData = currentFileData.toString().slice(0, index) + 
                  '<url>' + 
                  getLoc(type, id, subject) + 
                  getLastMod(date) + 
                  '</url>' + 
                  currentFileData.toString().slice(index);
  } else 
    return currentFileData;

  return newData;
}

function padFront(n){
  return n < 10 ? '0' + n : n;
}

function replaceWhiteSpace(input){
  return input.replace(/\s/g, "-");
}

exports.removeFromSitemap = removeFromSitemap;
exports.updateData = updateData;
exports.getLastMod = getLastMod;
exports.getLoc = getLoc;
exports.getNewFileData = getNewFileData;
exports.padFront = padFront;
exports.addToSitemap = addToSitemap;