var email = require("emailjs");
var util = require('util');
var config = require('../models/mailerConfig');

exports.sendEmail = function sendEmail(emailInfo, callback) {

    var server  = email.server.connect({
        user: config.user, 
        password: config.password, 
        host: "marten.arvixe.com", 
        ssl: true
    });

    console.log(util.inspect(emailInfo));
    //setting the attachment field sends as HTML 
    //send as plain text without it
    server.send({
        text:    emailInfo.msg, 
        from:    emailInfo.from, 
        to:      emailInfo.to,
        subject: emailInfo.subject,
        attachment: [{data: emailInfo.msg, alternative:true}]
        }, function(err, message) {
          if(err)
            callback(err);
          else
            callback(message);
    });
}
