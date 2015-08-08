var db = require('database');

/*
 * Gets all blog types.
 */
exports.getBlogTypes = function getBlogTypes(callback){

  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("SELECT  \"ID\", \"Type\" " + 
                           "FROM \"BlogTypes\""
                          , function (err, rows, result){     
    if(err) {
      console.log(err);
      return;        
    }

    // Stream results back one row at a time
    for(var i = 0; i < rows.length; i++){
      results.push(rows[i]);
    }
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(results);
  });
};

exports.getPostStatuses = function getPostStatuses(callback){

  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("SELECT  \"ID\", \"Status\" " + 
                           "FROM \"PostStatus\""
                          , function (err, rows, result){     
    if(err) {
      console.log(err);
      return;        
    }

    // Stream results back one row at a time
    for(var i = 0; i < rows.length; i++){
      results.push(rows[i]);
    }
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(results);
  });
};