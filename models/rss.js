var fs = require('fs');
var exports = module.exports = {};

//add rss entry when new blogPost (or some future pages) are created
function addRssEntry(blogPost){

  var subject = blogPost.subject;
  var id = blogPost.id;
  var body = blogPost.body;

  //read in current file first
  fs.readFile('./app/rss.xml', function(err, data){
  	if (err){
  	  console.log(err);
  	  return err;
  	}
  	
    //write out full new file
	  fs.writeFile('./app/rss.xml'
               , getNewFileData(subject, body, id, data)
               , function (err) {
  	  if (err) 
  	  	console.log(err);
  	  console.log('It\'s saved!');
	  });
  });
}

function removeRssEntry(id){
  //read in current file first
  fs.readFile('./app/rss.xml', function(err, data){
    if (err){
      console.log(err);
      return err;
    }
    console.log(data.toString());
    //write out full new file
    fs.writeFile('./app/rss.xml'
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

  var start = data.slice(index, data.length).indexOf('<item>') + index;
  var end = data.slice(index, data.length).indexOf('</item>') + index;

  //return if no url section found or if index is too high
  if(start < 0 || end < 0 || index >= data.length){
    return data;
  }

  //want to include the < when searching to be sure
  //1 does not mach 11 or 12 or 123, so if index of
  //1< is there, it means we matched 1 indentically
  var foundIndex = data.slice(start, end).indexOf('singlePost/' + id + '/');
  if(foundIndex < 0){
    return updateData(end + 7, id, data);
  } else {
    //remove url section
    var result = data.slice(0, start) + data.slice(end + 7);
    return result;
  }
}

function getDescription(body){
  if(body.length > 50)
    return body.slice(0, 50) + '...';
  else
    return body;
}

//form url from id
function getUrl(id, subject){
  if(id == null  || id <= 0){
    throw "no id given";
  }
  return 'http://hurtsblogging.com/views/singlePost/' + id + '/' + replaceWhiteSpace(subject);
}

function generateEntry(subject, body, id){
  if(subject == null || body == null || id == null)
    throw "cannot accept nulls";

  return '<item>' + 
          '<title>' + subject + '</title>' + 
          '<link>' + getUrl(id, subject) + '</link>' + 
          '<description><![CDATA[<html><body>' + body + '</body></html>]]></description>' + 
          '</item>'
}

function getNewFileData(subject, body, id, data){

  var newData = '';
  if(id == null || subject == null || body == null)
    return data;
  if(data == null)
    throw "no file loaded";
  console.log('data: ' + data);
  var index = data.toString().indexOf("</channel>");
  //need to change generateEntry to parse out html from description
  newData = data.toString().slice(0, index) + 
                generateEntry(subject, body, id) +
                data.toString().slice(index);
    
  return newData;
}

function replaceWhiteSpace(input){
  return input.replace(/\s/g, "-");
}

exports.removeRssEntry = removeRssEntry;
exports.updateData = updateData;
exports.getUrl = getUrl;
exports.generateEntry = generateEntry;
exports.getNewFileData = getNewFileData;
exports.getDescription = getDescription;
exports.addRssEntry = addRssEntry;