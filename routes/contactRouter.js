const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');
require('dotenv').config();

router.get('/', (req, res)=>{
    res.send({msg:"SEND CONTACT USING POST"})
})

router.post('/',(req,res)=> {
    const {name, email, message, subject} = req.body
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
          user: process.env.MAIL,
          pass: process.env.PASS
        }
      });
      
      var mailOptions = {
        from: email,
        to: 'mullinsatheem@gmail.com',
        subject: `${subject}`,
        text: `Name: ${name}
Email: ${email}
Contacted You With The Below Message
    ${message}
              `
      };
      
      transporter.sendMail(mailOptions, function(error, info){
        if (error) {
          console.log(error);
          res.status(400).send({msg : "Email could not be sent" + error})
        } else {
          console.log('Email sent: ' + info.response);
          res.send({msg: "Message sent succesfully"})
        }
      });
})
router.post('/DeleteUser', (req, res, next)=>{
  const {email} = req.body
  var transporter = nodemailer.createTransport({
      service: 'gmail',
      host: "smtp.gmail.com",
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL,
        pass: process.env.PASS
      }
    });
    
    var mailOptions = {
      from: "MullinsWebSupp@gmail.com",
      to: email,
      subject: `User Deleted`,
      text: `This is a Confirmation that your user account
at https//www.marine-ecyclopedia.web.app has been deleted.
`
    };
    
    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
        res.status(400).send({msg : "Email could not be sent" + error})
      } else {
        console.log('Email sent: ' + info.response);
        res.send({msg: "Message sent succesfully"})
      }
    });
})

module.exports = router;