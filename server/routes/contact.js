var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('../config/creds');

  var transport = {
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: creds.USER,
        pass: creds.PASS
    },
    tls:{
      rejectUnauthorized:false
    }
  }
  
  var transporter = nodemailer.createTransport(transport)
  
  transporter.verify((error, success) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Server is ready to take messages');
    }
  });
  
  router.post('/send', (req, res, next) => {
    var name = req.body.name
    var surname = req.body.surname
    var email = req.body.email
    var phone = req.body.phone
    var message = req.body.message
    var content = `name: ${name} \n surname: ${surname} \n email: ${email} \n  phone: ${phone} \n message: ${message} `
  
    var mail = {
      from: name,
      to: 'simonadev@yahoo.com',  //Change to email address that you want to receive messages on
      subject: 'New Message from Contact Form',
      text: content
    }
  
    transporter.sendMail(mail, (err, data) => {
      if (err) {
        res.json({
          msg: 'fail'
        })
      } else {
        res.json({
          msg: 'success'
        })
      }
    })
  })
  
  module.exports = router;
