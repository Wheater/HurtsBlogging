var db = require('database');
var users = require('../models/users');
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
                                  ", U.\"ID\" " +
                                  ", B.\"ID\" AS BlogID" +
                            "FROM \"BlogPost\" B " +
                            "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                            "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                            "INNER JOIN \"PostStatus\" P ON P.\"ID\" = B.\"PostStatusID\" " +
                            "WHERE P.\"Status\" = 'Post' " +
                            "ORDER BY \"PostDate\" DESC LIMIT 1000;"
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
 * Gets blog post by id
 */
exports.getPostById = function getPostById(id, callback){
  console.log(id);
  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("SELECT  \"Subject\" " +
                                  ", \"Body\" " +
                                  ", \"PostDate\" " +
                                  ", \"FirstName\" || \' \' || \"LastName\"  AS Name " +
                                  ", \"Type\" " +
                                  ", U.\"ID\" " +
                            "FROM \"BlogPost\" B " +
                            "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                            "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                            "INNER JOIN \"PostStatus\" P ON P.\"ID\" = B.\"PostStatusID\" " +
                            "WHERE B.\"ID\" = $1 "
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
                          "            , \"PostStatusID\" " +
                          ") " +
                          "VALUES  " +
                          "( " +
                          "              $5 " +
                          "            , $1 " +
                          "            , $2 " +
                          "            , $3 " +
                          "            , $4 " +
                          "            , $6 " +
                          ")"
                       , data
                       , function (err, rows, result){ 
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(err, result);
  });
};

exports.updatePost = function updatePost(post, callback){



  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("UPDATE \"BlogPost\"" + 
                           "SET " +
                           "\"Subject\" = $1," +
                           "\"Body\" = $2, " +
                           "\"BlogID\" = $4, " +
                           "\"PostStatusID\" = $5 " +
                           "WHERE \"ID\" = $3"
                          , post
                          , function (err, rows, result){     
    if(err) {
      console.log(err);
      callback(err, null);        
      return;
    }

    // Stream results back one row at a time
    for(var i = 0; i < rows.length; i++){
      results.push(rows[i]);
    }
    //this is a method of returning values asynchronously
    //rather than calling a return statement
    callback(null, results);
  });

};


/*
 * Gets posts per user id for editing
 */
exports.getPostsByUser = function getPostsByUser(userId, callback){

  var results = [];
  // SQL Query > Select Data
  var query = db.textQuery("SELECT  \"Subject\" " +
                                  ", \"Body\" " +
                                  ", \"PostDate\" " +
                                  ", \"FirstName\" || \' \' || \"LastName\"  AS Name " +
                                  ", \"Type\" " +
                                  ", U.\"ID\"" +
                                  ", B.\"ID\" AS BlogID " +
                                  ", T.\"ID\" AS BlogTypeID " +
                                  ", B.\"PostStatusID\" " +
                            "FROM \"BlogPost\" B " +
                            "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                            "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                            "WHERE U.\"ID\" = $1 "
                          , [userId]
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
 * Gets latest blog posts to display on front page.
 */
exports.getPostsByType = function getPostsByType(type, callback){

  var results = [];
  // SQL Query > Select Data
  if(type != 'All'){
    var query = db.textQuery("SELECT  \"Subject\" " +
                                    ", \"Body\" " +
                                    ", \"PostDate\" " +
                                    ", \"FirstName\" || \' \' || \"LastName\"  AS Name " +
                                    ", \"Type\" " +
                                    ", B.\"ID\" AS BlogID " +
                              "FROM \"BlogPost\" B " +
                              "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                              "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                              "INNER JOIN \"PostStatus\" P ON P.\"ID\" = B.\"PostStatusID\" " +
                              "WHERE P.\"Status\" = 'Post' " +
                              "  AND \"Type\" = $1" +
                              "ORDER BY B.\"ID\" desc LIMIT 1000;"
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
  } else if (type == 'All'){

    var query = db.textQuery("SELECT  \"Subject\" " +
                                    ", \"Body\" " +
                                    ", \"PostDate\" " +
                                    ", \"FirstName\" || \' \' || \"LastName\"  AS Name " +
                                    ", \"Type\" " +
                              "FROM \"BlogPost\" B " +
                              "INNER JOIN \"Users\" U ON U.\"ID\" = B.\"UserID\" " +
                              "INNER JOIN \"BlogTypes\" T ON T.\"ID\" = B.\"BlogID\" " +
                              "INNER JOIN \"PostStatus\" P ON P.\"ID\" = B.\"PostStatusID\" " +
                              "WHERE P.\"Status\" = 'Post' " +
                              "ORDER BY B.\"ID\" desc LIMIT 1;"      
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
  }
};