var db = require('database');
/*
 * Gets latest blog posts to display on front page.
 */
exports.getPostFeed = function getPostFeed(count, callback){

  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("SELECT  \"Subject\" " +
                                  ", \"Body\" " +
                                  ", \"PostDate\" " +
                                  ", \"FirstName\" || \' \' || \"LastName\"  AS Name " +
                                  ", \"Type\" " +
                            "FROM \"BlogPost\" B " +
                            "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                            "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                            "ORDER BY \"PostDate\" DESC LIMIT $1;"
                          , [count]
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

/*
 * Inserts a new post to the BlogPost table
 */
exports.insertPost = function insertPost(data, callback){

  var results = [];
  // SQL Query > Select Data
  console.log('Insert: ' + data);

  var query = db.textQuery("INSERT INTO \"BlogPost\" " +
                                      "( " +
                                      "              \"PostDate\" " +
                                      "            , \"Subject\" " +
                                      "            , \"Body\" " +
                                      "            , \"BlogID\" " +
                                      "            , \"UserID\" " +
                                      ") " +
                                      "VALUES  " +
                                      "( " +
                                      "              $5 " +
                                      "            , $1 " +
                                      "            , $2 " +
                                      "            , $3 " +
                                      "            , $4 " +
                                      ")"
                                   , data
                                   , function (err, rows, result){ 
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(err, result);
  });
};

/*
 * Gets latest blog posts to display on front page.
 */
exports.getPostsByType = function getPostsByType(type, callback){

  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("SELECT  \"Subject\" " +
                                  ", \"Body\" " +
                                  ", \"PostDate\" " +
                                  ", \"FirstName\" || \' \' || \"LastName\"  AS Name " +
                                  ", \"Type\" " +
                            "FROM \"BlogPost\" B " +
                            "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                            "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                            "WHERE \"Type\" = $1" +
                            "ORDER BY 1 desc LIMIT 10;"
                          , [type]
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