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
}
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