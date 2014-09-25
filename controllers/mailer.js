var Mailgun = require('mailgun-js');
var config = require('../config/mailgun.js');

exports.testEmail = function(req, res) {
    // console.log(req.body);
    var mailgun = new Mailgun({apiKey: config.mailgun.api_key, domain: config.mailgun.domain});
    var data = {
      from: config.mailgun.from_who,
      to: 'letsbartr@gmail.com',
      subject: 'Someone wants to trade!',
      html: req.body.currUser + ' wants to trade ' + req.body.postUser + ' for their ' + req.body.postTitle + '.'
    }
    mailgun.messages().send(data, function (err, body) {
        if (err) {
            res.send('error', { error : err});
            console.log("got an error: ", err);
        }
        else {
            res.send({ response : "letsbartr has been emailed about this bartr!" });
            console.log(body);
        }
    });
};

// app.get('/validate/:mail', function(req,res) {
//     var mailgun = new Mailgun({apiKey: api_key, domain: domain});

//     var members = [
//       {
//         address: req.params.mail
//       }
//     ];
// //For the sake of this tutorial you need to create a mailing list on Mailgun.com/cp/lists and put its address below
//     mailgun.lists('NAME@MAILINGLIST.COM').members().add({ members: members, subscribed: true }, function (err, body) {
//       console.log(body);
//       if (err) {
//             res.send("Error - check console");
//       }
//       else {
//         res.send("Added to mailing list");
//       }
//     });

// })


// app.get('/invoice/:mail', function(req,res){
//     //Which file to send? I made an empty invoice.txt file in the root directory
//     //We required the path module here..to find the full path to attach the file!
//     var path = require("path");
//     var fp = path.join(__dirname, 'invoice.txt');
//     //Settings
//     var mailgun = new Mailgun({apiKey: api_key, domain: domain});

//     var data = {
//       from: from_who,
//       to: req.params.mail,
//       subject: 'An invoice from your friendly hackers',
//       text: 'A fake invoice should be attached, it is just an empty text file after all',
//       attachment: fp
//     };


//     //Sending the email with attachment
//     mailgun.messages().send(data, function (error, body) {
//         if (error) {
//             res.render('error', {error: error});
//         }
//             else {
//             res.send("Attachment is on its way");
//             console.log("attachment sent", fp);
//             }
//         });
// })
