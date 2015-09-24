var nodemailer = require('nodemailer');

var mailFrom = 'hurtsblogging.noreply@gmail.com';
// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'hurtsblogging.noreply@gmail.com',
        pass: '!Bulerias1?'
    }
});

exports.emailBlast = function emailBlast(recipients, subject, body, cb){  
  // NB! No need to recreate the transporter object. You can use
  // the same transporter object for all e-mails
  // setup e-mail data with unicode symbols
  for(var i = 0; i < recipients.length; i++){
    var mailOptions = {
      from: mailFrom,
      to: mailTo,
      subject: subject,
      html: body
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return cb({err: error});
        }
        return cb({info: info});
    }); 
  }
}
