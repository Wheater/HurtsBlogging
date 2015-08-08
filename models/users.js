var db = require('database');

exports.verifyUser = function verifyUser(idToken, callback){

  var results = [];

  var query = db.textQuery("SELECT \"ID\" " + 
                           "FROM \"Users\" " + 
                           "WHERE \"IdToken\" =  $1"
                           , idToken
                           , function(err, rows, result){
    if(err) {
      console.log(err);
      return;        
    }

    for(var i = 0; i < rows.length; i++){
      results.push(rows[i]);
    }
    callback(results);
  });
};