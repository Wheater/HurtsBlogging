var db = require('database');
var util = require('util');

/*
 *  Add subscriber to for one blog type
 */
exports.addSubscriber = function addSubscriber(email, blogId, callback){
  var results = [];
  console.log(email + blogId);
  var data = [];
  data[0] = email;
  data[1] = blogId;

  var query = db.textQuery("INSERT INTO \"Subscribers\" " +
                          "( " +
                          "              \"Email\" " +
                          "            , \"BlogTypeID\" " +
                          ") " +
                          "SELECT " +
                          "              $1 " +
                          "            , B.\"ID\" " +
                          "FROM \"BlogTypes\" B " +
                          "INNER JOIN \"BlogPost\" P ON P.\"BlogID\" = B.\"ID\" " +
                          "WHERE P.\"ID\" = $2 "
                       , data
                       , function (err, rows, result){ 
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(err, result);
  });
};
//---------FINISH----------// ------NOT THE RIGHT QUERY ---- using doens't do what I thought it did
exports.removeSubscriber = function removeSubscriber(email, callback){

  var results = [];

  var data = [];
  data[0] = email;

  var query = db.textQuery("DELETE " +
                          " FROM \"Subscribers\" S " + 
                          " WHERE \"Email\" = $1 "  
                       , data
                       , function (err, rows, result){ 
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(err, result);
  });
}

exports.getEmailSentByBlogId = function getEmailSentByBlogId(id, callback){

  var query = db.textQuery("SELECT \"EmailSent\" " +
                        " FROM \"BlogPost\" " +
                        " WHERE \"ID\" = $1"
                        , [id]
                        , function (err, rows, result){     
    if(err) {
      console.log(err);
      return;        
    }

    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(rows[0]);
  });
}


exports.getSubscribersByBlogType = function getSubscribersByBlogType(id, callback){

  var results = [];
  console.log('id' + id);
  var query = db.textQuery("SELECT \"Email\" " +
                          " FROM \"Subscribers\" " +
                          " WHERE \"BlogTypeID\" = $1"
                          , [id]
                          , function (err, rows, result){     
    if(err) {
      console.log(err);
      return;        
    }

    // Stream results back one row at a time
    for(var i = 0; i < rows.length; i++){
      results.push(rows[i]);
    }
    console.log('subscribers: ' + util.inspect(results));
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(results);
  });
}
