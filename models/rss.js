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

function getDescription(body){
  if(body.length > 50)
    return body.slice(0, 50) + '...';
  else
    return body;
}

//form url from id
function getUrl(id){
  if(id == null  || id <= 0){
    throw "no id given";
  }
  return 'http://hurtsblogging.com/views/singlePost/' + id;
}

function generateEntry(subject, body, id){
  if(subject == null || body == null || id == null)
    throw "cannot accept nulls";

  return '<item>' + 
          '<title>' + subject + '</title>' + 
          '<link>' + getUrl(id) + '</link>' + 
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

exports.getUrl = getUrl;
exports.generateEntry = generateEntry;
exports.getNewFileData = getNewFileData;
exports.getDescription = getDescription;
exports.addRssEntry = addRssEntry;