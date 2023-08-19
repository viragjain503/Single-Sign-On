var express = require('express');
var router = express.Router();
const nodemailer = require("nodemailer");

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // Generates a 6-digit OTP
    }
    
    const transporter = nodemailer.createTransport({
        host: "smtp.forwardemail.net",
        port: 465,
        secure: true,
        auth: {
          // TODO: replace `user` and `pass` values from <https://forwardemail.net>
          user: 'viragjain501@gmail.com',
          pass: 'dontopenthis12345'
        }
      });

async function sendOTP(email) {
    const otp = generateOTP();
    const mailOptions = {
      from: "viragjain501@gmail.com",
      to: email,
      subject: "Your OTP",
      text: `Your OTP is: ${otp}`
};

try {
    await transporter.sendMail(mailOptions);
    return otp;
  } catch (error) {
    console.error("Error sending OTP:", error);
    return null;
  }
}

router.get('/', function(req, res, next) {
    console.log(req.query.email);
    res.json({
        otp : 111111
    })
    // sendOTP(req.query.email)
    //     .then((otp) => {
    //         if (otp) {
    //             res.json({
    //                 otp : otp
    //             })
    //         } else {
    //             console.log("Failed to send OTP.");
    //         }
    //     })
    //     .catch((error) => {
    //         console.error("Error sending OTP:", error);
    //     });
    
});
    
module.exports = router;
